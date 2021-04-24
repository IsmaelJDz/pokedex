import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './languages.module.css';

export default function Languages() {
  const [t, i18n] = useTranslation();

  return (
    <div className={styles.mainButtons}>
      <button
        type='button'
        className={styles.detailsButton}
        onClick={() => i18n.changeLanguage('es')}>
        Epañol
      </button>
      <button
        type='button'
        className={styles.detailsButton}
        onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
