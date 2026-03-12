import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame3}>
      <div className={styles.frame}>
        <div className={styles.rectangle5} />
      </div>
      <div className={styles.autoWrapper4}>
        <div className={styles.autoWrapper}>
          <div className={styles.rectangle1}>
            <img src="../image/mmjd0nhi-23gqbsu.svg" className={styles.frame2} />
          </div>
          <div className={styles.rectangle2} />
          <div className={styles.rectangle3} />
          <p className={styles.world}>World</p>
          <p className={styles.travel}>Travel</p>
          <p className={styles.text}>当旅行变成电影时</p>
          <p className={styles.wHentravelbecomesamo}>
            WHEN TRAVEL
            <br />
            BECOMES
            <br />A MOVIE
          </p>
        </div>
        <div className={styles.autoWrapper2}>
          <p className={styles.text2}>
            与其说我们是私人旅行定制公司，我们更像是电影制作公司，每一次出行都应是一场独一无二的电影，反规模化、反效率化的。我们相信一次好的旅行是活一次新的人生，如果你也对现在的旅游感到麻木，那么是时候跟着我们改变您对奢华和旅行的所有认知了
          </p>
          <p className={styles.ratherThanAPrivateTr}>
            Rather than a private travel design company, we see ourselves as a film
            studio.Every journey we create is a singular production—never
            replicated, never scaled, never rushed.We stand against standardization
            and efficiency for efficiency’s sake.
            <br />
            Because a truly great journey is not about ticking destinations off a
            list,but about living an entirely new life, if only for a moment.
            <br />
            If modern travel has left you feeling indifferent,perhaps it is time to
            travel with us—and rethink everything you thought you knew about luxury
            and the meaning of a journey.
          </p>
        </div>
        <div className={styles.autoWrapper3}>
          <div className={styles.rectangle4} />
          <p className={styles.aArcanusTravelAllRig}>
            © Arcanus Travel— All rights reserved
          </p>
          <p className={styles.siteByArcanusTravel}>Site by: Arcanus Travel</p>
          <div className={styles.group1}>
            <div className={styles.subtract}>
              <p className={styles.text3}>作品展示</p>
              <img src="../image/mmjd0nhi-akuf1k9.svg" className={styles.arrow3} />
            </div>
            <div className={styles.line2} />
          </div>
          <div className={styles.group2}>
            <div className={styles.subtract}>
              <p className={styles.text3}>关于我们</p>
              <img src="../image/mmjd0nhi-akuf1k9.svg" className={styles.arrow3} />
            </div>
            <div className={styles.line2} />
          </div>
          <div className={styles.group3}>
            <div className={styles.subtract}>
              <p className={styles.text3}>问答相关</p>
              <img src="../image/mmjd0nhi-akuf1k9.svg" className={styles.arrow3} />
            </div>
            <div className={styles.line2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
