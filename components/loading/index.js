import React from 'react';

import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.skCircle}>
      <div className={styles.skCircle1 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle2 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle3 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle4 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle5 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle6 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle7 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle8 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle9 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle10 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle11 + ' ' + styles.skChild}></div>
      <div className={styles.skCircle12 + ' ' + styles.skChild}></div>
    </div>
  );
};

export default Loading;
