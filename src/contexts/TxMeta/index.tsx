// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { setStateWithRef } from 'Utils';
import BigNumber from 'bignumber.js';
import { useTransferOptions } from 'contexts/TransferOptions';
import React, { useEffect, useState } from 'react';
import type { AnyJson, MaybeAccount } from 'types';
import * as defaults from './defaults';
import type { TxMetaContextInterface } from './types';

export const TxMetaContext = React.createContext<TxMetaContextInterface>(
  defaults.defaultTxMeta
);

export const useTxMeta = () => React.useContext(TxMetaContext);

export const TxMetaProvider = ({ children }: { children: React.ReactNode }) => {
  const { getTransferOptions } = useTransferOptions();

  // store the transaction fees for the transaction.
  const [txFees, setTxFees] = useState(new BigNumber(0));

  // store the sender of the transaction
  const [sender, setSender] = useState<MaybeAccount>(null);

  // store whether the sender does not have enough funds.
  const [notEnoughFunds, setNotEnoughFunds] = useState(false);

  // store the payload of a transaction if extrinsics require manual signing (e.g. Ledger).
  const [txPayload, setTxPayloadState] = useState<AnyJson>(null);
  const txPayloadRef = React.useRef(txPayload);

  // store an optional signed transaction if extrinsics require manual signing (e.g. Ledger).
  const [txSignature, setTxSignatureState] = useState<AnyJson>(null);
  const txSignatureRef = React.useRef(txSignature);

  useEffect(() => {
    const { freeBalance } = getTransferOptions(sender);
    setNotEnoughFunds(freeBalance.minus(txFees).isLessThan(0));
  }, [txFees, sender]);

  const resetTxFees = () => {
    setTxFees(new BigNumber(0));
  };

  const getTxPayload = () => {
    return txPayloadRef.current;
  };

  const setTxPayload = (p: AnyJson) => {
    setStateWithRef(p, setTxPayloadState, txPayloadRef);
  };

  const getTxSignature = () => {
    return txSignatureRef.current;
  };

  const setTxSignature = (s: AnyJson) => {
    setStateWithRef(s, setTxSignatureState, txSignatureRef);
  };

  const txFeesValid = (() => {
    if (txFees.isZero() || notEnoughFunds) {
      return false;
    }
    return true;
  })();

  return (
    <TxMetaContext.Provider
      value={{
        txFees,
        notEnoughFunds,
        setTxFees,
        resetTxFees,
        txFeesValid,
        sender,
        setSender,
        getTxPayload,
        setTxPayload,
        getTxSignature,
        setTxSignature,
      }}
    >
      {children}
    </TxMetaContext.Provider>
  );
};
