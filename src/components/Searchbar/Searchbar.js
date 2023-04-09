import React, { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ handleSubmit }) {
  const [currentInpunValue, setCurrentInpunValue] = useState('');

  const changeInpntValue = e => {
    setCurrentInpunValue(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(currentInpunValue);
  };

  const {
    SearchFormButton,
    SearchFormButtonLabel,
    Searchbar,
    SearchFormInput,
    SearchForm,
  } = s;
  return (
    <header className={Searchbar}>
      <form className={SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={SearchFormButton}>
          <span className={SearchFormButtonLabel}>Search</span>
        </button>

        <input
          value={currentInpunValue}
          className={SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeInpntValue}
        />
      </form>
    </header>
  );
}
