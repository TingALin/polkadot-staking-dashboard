// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { CanvasFullScreenWrapper } from 'canvas/Wrappers';
import { useOverlay } from 'kits/Overlay/Provider';
import { JoinPoolInterfaceWrapper } from './Wrappers';
import { useBondedPools } from 'contexts/Pools/BondedPools';
import { useEffect, useMemo, useState } from 'react';
import { Header } from './Header';
import { Overview } from './Overview';
import { Nominations } from './Nominations';
import { usePoolPerformance } from 'contexts/Pools/PoolPerformance';
import { MaxEraRewardPointsEras } from 'consts';
import { useStaking } from 'contexts/Staking';
import { useJoinPools } from 'contexts/Pools/JoinPools';

export const JoinPool = () => {
  const {
    closeCanvas,
    config: { options },
  } = useOverlay().canvas;
  const { eraStakers } = useStaking();
  const { poolsForJoin } = useJoinPools();
  const { getPoolRewardPoints } = usePoolPerformance();
  const { poolsMetaData, bondedPools } = useBondedPools();
  const poolRewardPoints = getPoolRewardPoints('pool_join');

  // The active canvas tab.
  const [activeTab, setActiveTab] = useState<number>(0);

  // Filter bonded pools to only those that are open and that have active daily rewards for the last
  // `MaxEraRewardPointsEras` eras. The second filter checks if the pool is in `eraStakers` for the
  // active era.
  const filteredBondedPools = useMemo(
    () =>
      poolsForJoin
        .filter((pool) => {
          // Fetch reward point data for the pool.
          const rawEraRewardPoints =
            poolRewardPoints[pool.addresses.stash] || {};
          const rewardPoints = Object.values(rawEraRewardPoints);

          // Ensure pool has been active for every era in performance data.
          const activeDaily =
            rewardPoints.every((points) => Number(points) > 0) &&
            rewardPoints.length === MaxEraRewardPointsEras;

          return pool.state === 'Open' && activeDaily;
        })
        // Ensure the pool is currently in the active set of backers.
        .filter((pool) =>
          eraStakers.stakers.find((staker) =>
            staker.others.find(({ who }) => who !== pool.addresses.stash)
          )
        ),
    [poolsForJoin, poolRewardPoints]
  );

  const initialSelectedPoolId = useMemo(
    () =>
      options?.poolId ||
      filteredBondedPools[(filteredBondedPools.length * Math.random()) << 0]
        .id ||
      0,
    []
  );

  // The selected bonded pool id. Assigns a random id if one is not provided.
  const [selectedPoolId, setSelectedPoolId] = useState<number>(
    initialSelectedPoolId
  );

  // The bonded pool to display. Use the provided `poolId`, or assign a random eligible filtered
  // pool otherwise. Re-fetches when the selected pool count is incremented.
  const bondedPool = useMemo(
    () => bondedPools.find(({ id }) => id === selectedPoolId),
    [selectedPoolId]
  );

  // Close canvas if no pool id is selected.
  useEffect(() => {
    if (selectedPoolId === 0) {
      closeCanvas();
    }
  }, [selectedPoolId]);

  // Ensure bonded pool exists before rendering. Canvas should close if this is the case.
  if (!bondedPool) {
    return null;
  }

  return (
    <CanvasFullScreenWrapper>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedPoolId={setSelectedPoolId}
        bondedPool={bondedPool}
        metadata={poolsMetaData[selectedPoolId]}
        autoSelected={options?.poolId === undefined}
        filteredBondedPools={filteredBondedPools}
      />

      <JoinPoolInterfaceWrapper>
        <div className="content">
          {activeTab === 0 && <Overview bondedPool={bondedPool} />}
          {activeTab === 1 && (
            <Nominations
              poolId={bondedPool.id}
              stash={bondedPool.addresses.stash}
            />
          )}
        </div>
      </JoinPoolInterfaceWrapper>
    </CanvasFullScreenWrapper>
  );
};