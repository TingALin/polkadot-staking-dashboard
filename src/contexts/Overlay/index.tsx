// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { RefObject } from 'react';
import React, { useRef, useState } from 'react';
import { setStateWithRef } from '@polkadot-cloud/utils';
import { useEffectIgnoreInitial } from 'library/Hooks/useEffectIgnoreInitial';
import type {
  ModalConfig,
  ModalStatus,
  OverlayContextInterface,
} from './types';
import { defaultOverlayContext } from './defaults';

export const OverlayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Store the modal status.
  const [modalStatus, setModalStatusState] = useState<ModalStatus>('closed');
  const modalStatusRef = useRef(modalStatus);

  // Store modal configuration.
  const [modalConfig, setModalConfigState] = useState<ModalConfig>({
    key: '',
    options: {},
    size: 'large',
  });
  const modalConfigRef = useRef(modalConfig);

  // Store the modal's current height.
  const [modalHeight, setModalHeightState] = useState<number>(0);

  // Store the modal's resize counter.
  const [modalResize, setModalResizeState] = useState<number>(0);

  // Store the ref to the modal height container. Used for controlling whether height is transitionable.
  const [modalRef, setModalRef] = useState<RefObject<HTMLDivElement>>();

  // Store the ref to the modal height container. Used for controlling whether height is transitionable.
  const [modalHeightRef, setModalHeightRef] =
    useState<RefObject<HTMLDivElement>>();

  // The maximum allowed height for the modal.
  const modalMaxHeight = window.innerHeight * 0.8;

  const setModalConfig = (config: ModalConfig) => {
    setStateWithRef(config, setModalConfigState, modalConfigRef);
  };

  const setModalStatus = (newStatus: ModalStatus) => {
    setStateWithRef(newStatus, setModalStatusState, modalStatusRef);
  };

  const openModal = ({ key, size = 'large', options = {} }: ModalConfig) => {
    setModalConfig({ key, size, options });
    setModalStatus('opening');
  };

  // Closes one modal and opens another.
  const replaceModal = ({ key, size = 'large', options = {} }: ModalConfig) => {
    setModalStatus('replacing');
    setTimeout(() => {
      openModal({
        key,
        size,
        options,
      });
    }, 10);
  };

  const setModalHeight = (height: number, transition: boolean = true) => {
    if (modalStatusRef.current === 'closed') return;

    // Ensrue transition class is removed if not transitioning. Otherwise, ensure class exists.
    if (transition) transitionOn();
    else transitionOff();

    // If transitioning, ensure the class exists.
    if (transition) transitionOn();

    // Limit maximum height to 80% of window height, and set.
    const maxHeight = window.innerHeight * 0.8;
    height = height > maxHeight ? maxHeight : height;
    setModalHeightState(height);

    // If transitioning, remove after enough time to finish transition.
    if (transition) setTimeout(() => transitionOff(), 500);
  };

  // Increments modal resize to trigger a height transition.
  const setModalResize = () => {
    transitionOn();
    setModalResizeState(modalResize + 1);
    setTimeout(() => transitionOff(), 500);
  };

  // Helper to set the transition height class of the modal.
  const transitionOn = () =>
    modalHeightRef?.current?.classList.add('transition-height');

  // Helper to remove the transition height class of the modal.
  const transitionOff = () =>
    modalHeightRef?.current?.classList.remove('transition-height');

  useEffectIgnoreInitial(() => {
    const height = modalRef?.current?.clientHeight || 0;
    if (modalStatusRef.current === 'opening') {
      setModalHeight(height, false);
      if (height > 0) {
        setModalStatus('open');
      }
    }
  }, [modalStatusRef.current, modalRef?.current]);

  return (
    <OverlayContext.Provider
      value={{
        modal: {
          status: modalStatusRef.current,
          config: modalConfigRef.current,
          height: modalHeight,
          resize: modalResize,
          maxHeight: modalMaxHeight,
          setResize: setModalResize,
          setHeight: setModalHeight,
          setRef: setModalRef,
          setHeightRef: setModalHeightRef,
          setModalStatus,
          openModal,
          replaceModal,
        },
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const OverlayContext = React.createContext<OverlayContextInterface>(
  defaultOverlayContext
);

export const useOverlay = () => React.useContext(OverlayContext);
