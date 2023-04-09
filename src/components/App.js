import React, { useState } from 'react';
import s from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

// import

export default function App() {
  const [searthText, setSearthText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  const onSubmit = text => {
    setSearthText(text);
    setCurrentPage(1);
  };
  const openModal = e => {
    const alt = e.target.alt;
    const srs = e.target.dataset.modal;
    setCurrentItem({ alt, srs });
  };

  return (
    <div className={s.App}>
      {currentItem && (
        <Modal
          item={currentItem}
          closeModal={() => {
            setCurrentItem(null);
          }}
        />
      )}
      <Searchbar handleSubmit={onSubmit} />
      <ImageGallery
        text={searthText}
        page={currentPage}
        clickBtn={() => setCurrentPage(currentPage => currentPage + 1)}
        itemClick={openModal}
      />
    </div>
  );
}
