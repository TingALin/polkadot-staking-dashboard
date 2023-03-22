// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProxies } from 'contexts/Accounts/Proxies';
import type { Proxy } from 'contexts/Accounts/Proxies/type';
import { useConnect } from 'contexts/Connect';

export const ProxyAccounts = () => {
  const { proxies } = useProxies();
  const { activeAccount, getAccount } = useConnect();

  const proxyList = proxies.find((p: Proxy) => p.delegator === activeAccount);

  return (
    <div>
      {proxies.length > 0 &&
        proxyList?.delegates.map((d, index) => {
          return (
            <div key={index}>
              {/* Every React element in a list should have a key assigned to it. The key is an HTML attribute and should be a stable identifier. */}
              {getAccount(d.delegate)?.name}| {d.proxyType}{' '}
              {d.proxyType === 'Any' || d.proxyType === 'Staking' ? (
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              ) : (
                <></>
              )}
            </div>
          );
        })}
    </div>
  );
};
