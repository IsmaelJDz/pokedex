import styles from './input.module.css';

export default function InputSearch({ handleChange }) {
  return (
    <div className={styles.MainInput}>
      <input
        type='search'
        name='search'
        className={styles.Search}
        pattern='.*\S.*'
        placeholder='Search'
        onChange={evt => handleChange(evt)}
      />
    </div>
  );
}
