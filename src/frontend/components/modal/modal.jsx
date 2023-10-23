import React, { useState } from 'react';
import styles from './modal.module.css';
const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.openButton}>
        {props.openButtonText || 'Åbn modal'}
      </button>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={closeModal} className={styles.closeButton}>
              {props.closeButtonText || 'Luk modal'}
            </button>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
