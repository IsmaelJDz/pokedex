import React from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

/**
 * TO DO: Change the key for real value;
 */

import styles from './card.module.css';

const Card = props => {
  const [t, i18n] = useTranslation('global');

  const router = useRouter();

  const goToDetails = id => {
    const newId = id;

    router.push(`/pokemons/${newId}`);
  };

  return (
    <div className={styles.MainCard}>
      {props.data.map((item, index) => (
        <div className={styles.Card} key={index}>
          <figure>
            <img
              alt={item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.slice(
                34,
                -1
              )}.png`}
            />
          </figure>
          <p className={styles.CardTitle}>
            {item.url.slice(34, -1)} {item.name}
          </p>
          <button
            data-testId='SeeDetails'
            className={styles.CardButton}
            onClick={() => goToDetails(item.url.slice(34, -1))}>
            {t('card.seeDetails')}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
