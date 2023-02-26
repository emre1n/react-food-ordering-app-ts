import React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './styles.module.css';

type TProps = {
  onClose: () => void;
};

const Backdrop = ({ onClose }: TProps) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

type TPropsModal = {
  children: JSX.Element;
  onClose: () => void;
};

type TModalOverlay = {
  children: JSX.Element;
};

const ModalOverlay = ({ children }: TModalOverlay) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement: HTMLElement = document.getElementById('overlays')!;

const Modal = ({ children, onClose }: TPropsModal) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
