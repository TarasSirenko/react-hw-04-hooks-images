import s from './ImageGallery.module.css';
import React, { useState, useEffect } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import api from '../../Api/Api';
import ErrorMesage from 'components/ErrorMesage/ErrorMesage';

export default function ImageGallery({ text, page, clickBtn, itemClick }) {
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (text === '') return;
    setStatus('pending');
    api
      .fetchImage(text, page)
      .then(response => {
        if (response.total === 0) {
          setStatus('rejected');
          return Promise.reject(
            new Error(`Нет изображений по запросу ${text}`),
          );
        }
        page > 1
          ? setResponse(res => [...res, ...response.hits])
          : setResponse(response.hits);
        setStatus('resolved');
      })
      .catch(error => setError(error));
  }, [text, page]);

  if (status === 'idle') return;
  if (page === 1) {
    if (status === 'pending') return <Loader />;
  }
  if (status === 'resolved' || (status === 'pending' && page > 1)) {
    return (
      <>
        <ul className={s.Gallery}>
          {response.map(({ id, webformatURL, tags, largeImageURL }, index) => (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              alt={tags}
              largeImg={largeImageURL}
              onClick={itemClick}
            />
          ))}
        </ul>
        {status === 'pending' ? <Loader /> : <Button onClick={clickBtn} />}
      </>
    );
  }
  if (status === 'rejected') return <ErrorMesage message={error.message} />;
}
