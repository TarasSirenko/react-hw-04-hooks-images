import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      ЗАГРУЗИТЬ ЕЩЕ
    </button>
  );
}
