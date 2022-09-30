// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useActivePool } from 'contexts/Pools/ActivePool';
import { useModal } from 'contexts/Modal';
import { PageRowWrapper } from 'Wrappers';
import { CardWrapper, CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { OpenHelpIcon } from 'library/OpenHelpIcon';
import { Button } from 'library/Button';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Nominations from 'pages/Nominate/Active/Nominations';
import { GenerateNominations } from 'library/GenerateNominations';
import { useUi } from 'contexts/UI';
import { useConnect } from 'contexts/Connect';
import { PoolState } from 'contexts/Pools/types';
import { useTranslation } from 'react-i18next';

export const ManagePool = () => {
  const { isSyncing } = useUi();
  const { openModalWith } = useModal();
  const { activeAccount } = useConnect();
  const { t } = useTranslation('common');
  const {
    isNominator,
    setTargets,
    targets,
    poolNominations,
    activeBondedPool,
  } = useActivePool();

  const isNominating = !!poolNominations?.targets?.length;
  const nominator = activeBondedPool?.addresses?.stash ?? null;
  const { state } = activeBondedPool?.bondedPool || {};

  return (
    <PageRowWrapper className="page-padding" noVerticalSpacer>
      <CardWrapper>
        {isSyncing ? (
          <Nominations bondType="pool" nominator={activeAccount} />
        ) : isNominator() && !isNominating && state !== PoolState.Destroy ? (
          <>
            <CardHeaderWrapper withAction>
              <h3>
                {t('pages.Pools.generate_nominations')}
                <OpenHelpIcon helpKey="Nominations" />
              </h3>
              <div>
                <Button
                  small
                  inline
                  primary
                  icon={faChevronCircleRight}
                  transform="grow-1"
                  title={t('pages.Pools.nominate')}
                  disabled={!isNominator()}
                  onClick={() => openModalWith('NominatePool', {}, 'small')}
                />
              </div>
            </CardHeaderWrapper>
            <GenerateNominations
              batchKey="generate_pool_nominations"
              nominations={targets.nominations}
              setters={[
                {
                  set: setTargets,
                  current: targets,
                },
              ]}
            />
          </>
        ) : (
          <Nominations bondType="pool" nominator={nominator} />
        )}
      </CardWrapper>
    </PageRowWrapper>
  );
};

export default ManagePool;
