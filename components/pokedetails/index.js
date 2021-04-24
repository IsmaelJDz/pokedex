import React from 'react';
import Languages from '../languages/index';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import styles from './details.module.css';

const PokeDetails = ({ data }) => {
  const [t, i18n] = useTranslation('global');
  const { name, sprites, types, height, weight, id } = data;

  const router = useRouter();

  const backAllPokemons = () => {
    router.push('/');
  };

  return (
    <div className={styles.details}>
      <Languages />
      <button className={styles.detailsButton} onClick={backAllPokemons}>
        {t('details.back')}
      </button>
      <div className={styles.info}>
        <p className={styles.title}>{t('details.title')}</p>

        <div className={styles.containerName}>
          <figure className={styles.figure}>
            <img alt={name} src={sprites.front_default} />
          </figure>
          <p className={styles.name}>
            {name} #{id}{' '}
          </p>
        </div>

        <div className={styles.specificDetails}>
          <div className={styles.types}>
            {t('details.type')}
            {types.map(item => (
              <p key={item.slot} className={styles.characteristics}>
                {item.type.name}
              </p>
            ))}
          </div>

          <div className={styles.hw}>
            <p className={styles.characteristics}>
              <span>{t('details.height')}</span> {height} metros
            </p>
            <p className={styles.characteristics}>
              <span>{t('details.weight')} </span>
              {weight} kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDetails;
