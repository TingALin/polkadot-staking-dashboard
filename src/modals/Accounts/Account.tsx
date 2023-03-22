// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clipAddress } from 'Utils';
import { useProxies } from 'contexts/Accounts/Proxies';
import { useConnect } from 'contexts/Connect';
import { useExtensions } from 'contexts/Extensions';
import type { ExtensionInjected } from 'contexts/Extensions/types';
import { useModal } from 'contexts/Modal';
import { Identicon } from 'library/Identicon';
import { AccountWrapper, ProxiedAccountsWrapper } from './Wrappers';
import type { AccountItemProps } from './types';

export const AccountButton = (props: AccountItemProps) => {
  const { meta } = props;
  const disconnect = props.disconnect ?? false;
  const { connectToAccount, disconnectFromAccount } = useConnect();
  const { setStatus } = useModal();
  const imported = meta !== null;

  return (
    <AccountWrapper>
      <button
        type="button"
        disabled={!disconnect && !imported}
        onClick={() => {
          if (imported) {
            if (disconnect) {
              disconnectFromAccount();
            } else {
              connectToAccount(meta);
              setStatus(2);
            }
          }
        }}
      >
        <AccountInner {...props} />
      </button>
    </AccountWrapper>
  );
};

export const AccountInner = ({
  address,
  meta,
  label = undefined,
}: AccountItemProps) => {
  const { extensions } = useExtensions();
  const extension = extensions.find(
    (e: ExtensionInjected) => e.id === meta?.source
  );
  const Icon = extension?.icon ?? undefined;
  const source = meta?.source ?? undefined;
  const imported = meta !== undefined && source !== 'external';
  const { getProxiedAccounts } = useProxies();
  const proxiedAccounts = getProxiedAccounts(address ?? '');
  const { getAccount } = useConnect();

  return (
    <>
      <div>
        <Identicon value={address ?? ''} size={26} />
        <span className="name">
          &nbsp; {meta?.name ?? clipAddress(address ?? '')}
        </span>
      </div>
      {!imported && (
        <div
          className="label warning"
          style={{ color: '#a17703', paddingLeft: '0.5rem' }}
        >
          Read Only
        </div>
      )}

      {proxiedAccounts.length > 0 &&
        proxiedAccounts.map((d, index) => {
          return (
            <>
              <ProxiedAccountsWrapper>
                <div key={index}>
                  &nbsp; {d.proxyType} | {getAccount(d.address)?.name}
                </div>
              </ProxiedAccountsWrapper>
            </>
          );
        })}
      <div className={label === undefined ? `` : label[0]}>
        {label !== undefined ? <h5>{label[1]}</h5> : null}
        {Icon !== undefined ? <Icon className="icon" /> : null}

        {!imported && (
          <FontAwesomeIcon
            icon={faGlasses}
            className="icon"
            style={{ opacity: 0.7 }}
          />
        )}
      </div>
    </>
  );
};
