// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { remToUnit } from 'Utils';
import { useProxies } from 'contexts/Accounts/Proxies';
import type { Proxy } from 'contexts/Accounts/Proxies/type';
import { useConnect } from 'contexts/Connect';
import { Identicon } from 'library/Identicon';
import { ProxyAccountWrapper, ProxyWrapper } from './Wrappers';

export const ProxyAccounts = () => {
  const { proxies } = useProxies();
  const { activeAccount, getAccount } = useConnect();

  const proxyList = proxies.find((p: Proxy) => p.delegator === activeAccount);

  return (
    <ProxyAccountWrapper>
      {proxies.length > 0 &&
        proxyList?.delegates.map((d, index) => {
          return (
            <div key={index}>
              <ProxyWrapper>
                {/* Every React element in a list should have a key assigned to it. The key is an HTML attribute and should be a stable identifier. */}
                {d.proxyType} |
                <span className="identicon">
                  <Identicon
                    value={d.delegate}
                    size={remToUnit('1.05rem') * 1.4}
                  />
                </span>
                {getAccount(d.delegate)?.name}
                {d.proxyType === 'Any' || d.proxyType === 'Staking' ? (
                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                ) : (
                  <></>
                )}
              </ProxyWrapper>
            </div>
          );
        })}
    </ProxyAccountWrapper>
  );
};
