import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame4}>
      <div className={styles.frame2}>
        <div className={styles.rectangle1}>
          <p className={styles.world}>World</p>
          <img src="../image/mmk8bemw-qasceu3.svg" className={styles.frame} />
          <p className={styles.travel}>Travel</p>
        </div>
        <div className={styles.autoWrapper}>
          <p className={styles.world}>© Arcanus Travel— All rights reserved</p>
          <p className={styles.siteByArcanusTravel}>Site by: Arcanus Travel</p>
        </div>
      </div>
      <div className={styles.frame3}>
        <div className={styles.autoWrapper2}>
          <img src="../image/mmk8bemy-s6sp662.png" className={styles.rectangle} />
          <img src="../image/mmk8bemy-b1l0ht9.png" className={styles.rectangle2} />
        </div>
        <div className={styles.autoWrapper3}>
          <div className={styles.group4}>
            <p className={styles.miradaTravel}>Mirada Travel</p>
            <p className={styles.text}>西班牙&葡萄牙旅行</p>
          </div>
          <div className={styles.group5}>
            <p className={styles.originTravel}>Origin Travel</p>
            <p className={styles.text}>日本旅行</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
