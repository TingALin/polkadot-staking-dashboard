// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { u8aToBuffer } from '@polkadot/util';
import { newSubstrateApp } from '@zondax/ledger-substrate';
import { localStorageOrDefault, setStateWithRef } from 'Utils';
import { useApi } from 'contexts/Api';
import type { LedgerAccount } from 'contexts/Connect/types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AnyFunction, AnyJson } from 'types';
import {
  LEDGER_DEFAULT_ACCOUNT,
  LEDGER_DEFAULT_CHANGE,
  LEDGER_DEFAULT_INDEX,
  TOTAL_ALLOWED_STATUS_CODES,
  defaultLedgerHardwareContext,
} from './defaults';
import type {
  LedgerHardwareContextInterface,
  LedgerResponse,
  LedgerTask,
  PairingStatus,
} from './types';

export const LedgerHardwareContext =
  React.createContext<LedgerHardwareContextInterface>(
    defaultLedgerHardwareContext
  );

export const useLedgerHardware = () => React.useContext(LedgerHardwareContext);

export const LedgerHardwareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation('modals');
  const { network } = useApi();

  // Store whether the device has been paired.
  const [isPaired, setIsPairedState] = useState<PairingStatus>('unknown');
  const isPairedRef = useRef(isPaired);

  // Store whether an import is in process.
  const [isExecuting, setIsExecutingState] = useState(false);
  const isExecutingRef = useRef(isExecuting);

  // Store status codes received from Ledger device.
  const [statusCodes, setStatusCodes] = useState<Array<LedgerResponse>>([]);
  const statusCodesRef = useRef(statusCodes);

  // Get the default message to display, set when a failed loop has happened.
  const [defaultMessage, setDefaultMessageState] = useState<string | null>(
    null
  );
  const defaultMessageRef = useRef(defaultMessage);

  // Store the latest successful response from an attempted `executeLedgerLoop`.
  const [transportResponse, setTransportResponse] = useState<AnyJson>(null);

  const ledgerInProgress = useRef(false);

  // Store the imported ledger accounts.
  const initialLedgerAccounts = localStorageOrDefault(
    'imported_addresses',
    [],
    true
  ) as Array<LedgerAccount>;
  const [ledgerAccounts, setLedgerAccountsState] = useState<
    Array<LedgerAccount>
  >(initialLedgerAccounts);
  const ledgerAccountsRef = useRef(ledgerAccounts);

  // The ledger transport interface.
  const ledgerTransport = useRef<any>(null);

  // Handles errors that occur during a `executeLedgerLoop`.
  const handleErrors = (err: AnyJson) => {
    ledgerInProgress.current = false;
    setIsExecuting(false);
    err = String(err);

    // close any open connections.
    if (ledgerTransport.current?.device?.opened) {
      ledgerTransport.current?.device?.close();
    }

    if (
      err.startsWith('TransportOpenUserCancelled') ||
      err.startsWith('Error: Ledger Device is busy')
    ) {
      setDefaultMessage(t('connectLedgerToContinue'));
      handleNewStatusCode('failure', 'DeviceNotConnected');
    } else if (err.startsWith('Error: Transaction rejected')) {
      setDefaultMessage(t('transactionRejectedPending'));
      handleNewStatusCode('failure', 'TransactionRejected');
    } else if (err.startsWith('Error: Unknown Status Code: 28161')) {
      handleNewStatusCode('failure', 'AppNotOpenContinue');
      setDefaultMessage(t('openPolkadotOnLedger'));
    } else {
      setDefaultMessage(t('openPolkadotOnLedger'));
      handleNewStatusCode('failure', 'AppNotOpen');
    }
  };

  // Check whether the device is paired.
  //
  // Trigger a one-time connection to the device to determine if it is available. If the device
  // needs to be paired, a browser prompt will pop up and initialisation of `transport` will hault
  // until the user has completed or cancelled the pairing process.
  const pairDevice = async () => {
    try {
      resetStatusCodes();
      // close any open connections.
      if (ledgerTransport.current?.device?.opened) {
        await ledgerTransport.current?.device?.close();
      }
      // establish a new connection with device.
      ledgerTransport.current = await TransportWebHID.create();
      setIsPaired('paired');
      return true;
    } catch (err) {
      handleErrors(err);
      return false;
    }
  };

  // Connects to a Ledger device to perform a task.
  const executeLedgerLoop = async (
    transport: AnyJson,
    tasks: Array<LedgerTask>,
    options?: AnyJson
  ) => {
    try {
      if (ledgerInProgress.current) {
        return;
      }
      ledgerInProgress.current = true;

      let result = null;
      if (tasks.includes('get_address')) {
        result = await handleGetAddress(transport, options?.accountIndex || 0);
      } else if (tasks.includes('sign_tx')) {
        result = await handleSignTx(
          transport,
          options?.accountIndex || 0,
          options?.payload || ''
        );
      }

      if (result) {
        setTransportResponse({
          ack: 'success',
          options,
          ...result,
        });
      }

      ledgerInProgress.current = false;
    } catch (err) {
      handleErrors(err);
    }
  };

  // Timeout function for hanging tasks.
  const withTimeout = (millis: AnyFunction, promise: AnyFunction) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(async () => {
        ledgerTransport.current?.device?.close();
        reject(Error());
      }, millis)
    );
    return Promise.race([promise, timeout]);
  };

  // Gets a Polkadot address on device.
  const handleGetAddress = async (transport: AnyJson, index: number) => {
    const polkadot = newSubstrateApp(transport, 'Polkadot');
    const { deviceModel } = transport;
    const { id, productName } = deviceModel;

    setTransportResponse({
      ack: 'success',
      statusCode: 'GettingAddress',
      body: `Getting addresess ${index} in progress.`,
    });

    const result: AnyJson = await withTimeout(
      500,
      polkadot.getAddress(
        LEDGER_DEFAULT_ACCOUNT + index,
        LEDGER_DEFAULT_CHANGE,
        LEDGER_DEFAULT_INDEX + 0,
        false
      )
    );

    setDefaultMessage(null);
    await ledgerTransport.current?.device?.close();

    const error = result?.error_message;
    if (error) {
      if (!error.startsWith('No errors')) {
        throw new Error(error);
      }
    }

    if (!(result instanceof Error)) {
      return {
        statusCode: 'ReceivedAddress',
        device: { id, productName },
        body: [result],
      };
    }
  };

  // Signs a payload on device.
  const handleSignTx = async (
    transport: AnyJson,
    index: number,
    payload: AnyJson
  ) => {
    const polkadot = newSubstrateApp(transport, 'Polkadot');
    const { deviceModel } = transport;
    const { id, productName } = deviceModel;

    setTransportResponse({
      ack: 'success',
      statusCode: 'SigningPayload',
      body: `Signing extrinsic in progress.`,
    });

    setDefaultMessage(t('approveTransactionLedger'));

    const result = await polkadot.sign(
      LEDGER_DEFAULT_ACCOUNT + index,
      LEDGER_DEFAULT_CHANGE,
      LEDGER_DEFAULT_INDEX + 0,
      u8aToBuffer(payload.toU8a(true))
    );

    setDefaultMessage(t('signedTransactionSuccessfully'));

    await ledgerTransport.current?.device?.close();

    const error = result?.error_message;
    if (error) {
      if (!error.startsWith('No errors')) {
        throw new Error(error);
      }
    }

    if (!(result instanceof Error)) {
      return {
        statusCode: 'SignedPayload',
        device: { id, productName },
        body: result.signature,
      };
    }
  };

  // Handle an incoming new status code and persist to state.
  const handleNewStatusCode = (ack: string, statusCode: string) => {
    const newStatusCodes = [{ ack, statusCode }, ...statusCodes];

    // Remove last status code if there are more than allowed number of status codes.
    if (newStatusCodes.length > TOTAL_ALLOWED_STATUS_CODES) {
      newStatusCodes.pop();
    }
    setStateWithRef(newStatusCodes, setStatusCodes, statusCodesRef);
  };

  // Check if an address exists in imported addresses.
  const ledgerAccountExists = (address: string) => {
    const imported = localStorageOrDefault(
      'ledger_accounts',
      [],
      true
    ) as Array<LedgerAccount>;
    return !!imported.find((a: LedgerAccount) => a.address === address);
  };

  const addLedgerAccount = (address: string, index: number) => {
    let newImported = localStorageOrDefault(
      'ledger_accounts',
      [],
      true
    ) as Array<LedgerAccount>;

    const ledgerAddresses = localStorageOrDefault(
      'ledger_addresses',
      [],
      true
    ) as Array<AnyJson>;

    const ledgerAddress = ledgerAddresses.find(
      (a: AnyJson) => a.address === address
    );

    if (
      ledgerAddress &&
      !newImported.find((a: LedgerAccount) => a.address === address)
    ) {
      const account = {
        address,
        network: network.name,
        name: ledgerAddress.name,
        source: 'ledger',
        index,
      };
      newImported = [...newImported].concat(account);
      localStorage.setItem('ledger_accounts', JSON.stringify(newImported));
      setStateWithRef(newImported, setLedgerAccountsState, ledgerAccountsRef);

      return account;
    }
    return null;
  };

  const removeLedgerAccount = (address: string) => {
    let newImported = localStorageOrDefault(
      'ledger_accounts',
      [],
      true
    ) as Array<LedgerAccount>;

    newImported = newImported.filter(
      (a: LedgerAccount) => a.address !== address
    );
    if (!newImported.length) {
      localStorage.removeItem('ledger_accounts');
    } else {
      localStorage.setItem('ledger_accounts', JSON.stringify(newImported));
    }
    setStateWithRef(newImported, setLedgerAccountsState, ledgerAccountsRef);
  };

  // Gets an imported address along with its Ledger metadata.
  const getLedgerAccount = (address: string) => {
    const imported = localStorageOrDefault(
      'ledger_accounts',
      [],
      true
    ) as Array<LedgerAccount>;
    if (!imported) {
      return null;
    }
    return imported.find((a: LedgerAccount) => a.address === address) ?? null;
  };

  const renameLedgerAccount = (address: string, newName: string) => {
    let newImported = localStorageOrDefault(
      'ledger_accounts',
      [],
      true
    ) as Array<LedgerAccount>;
    newImported = newImported.map((a: LedgerAccount) =>
      a.address === address
        ? {
            ...a,
            name: newName,
          }
        : a
    );
    localStorage.setItem('ledger_accounts', JSON.stringify(newImported));
    setStateWithRef(newImported, setLedgerAccountsState, ledgerAccountsRef);
  };

  const getTransport = () => {
    return ledgerTransport.current;
  };

  const getIsExecuting = () => {
    return isExecutingRef.current;
  };

  const getStatusCodes = () => {
    return statusCodesRef.current;
  };

  const getDefaultMessage = () => {
    return defaultMessageRef.current;
  };

  const setDefaultMessage = (val: string | null) => {
    setStateWithRef(val, setDefaultMessageState, defaultMessageRef);
  };

  const setIsPaired = (p: PairingStatus) => {
    setStateWithRef(p, setIsPairedState, isPairedRef);
  };

  const setIsExecuting = (val: boolean) => {
    setStateWithRef(val, setIsExecutingState, isExecutingRef);
  };

  const resetStatusCodes = () => {
    setStateWithRef([], setStatusCodes, statusCodesRef);
  };

  return (
    <LedgerHardwareContext.Provider
      value={{
        pairDevice,
        transportResponse,
        executeLedgerLoop,
        setIsPaired,
        setIsExecuting,
        handleNewStatusCode,
        resetStatusCodes,
        getIsExecuting,
        getStatusCodes,
        handleErrors,
        getTransport,
        ledgerAccountExists,
        addLedgerAccount,
        removeLedgerAccount,
        renameLedgerAccount,
        getLedgerAccount,
        getDefaultMessage,
        setDefaultMessage,
        isPaired: isPairedRef.current,
        ledgerAccounts: ledgerAccountsRef.current,
      }}
    >
      {children}
    </LedgerHardwareContext.Provider>
  );
};
