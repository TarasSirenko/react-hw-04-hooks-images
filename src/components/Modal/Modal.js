import s from './Modal.module.css';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, item }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { srs, alt } = item;
  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>
        <img src={srs} alt={alt} className={s.Img} />
      </div>
    </div>,
    modalRoot,
  );
}
