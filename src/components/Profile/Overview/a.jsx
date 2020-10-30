<div className={styles.gaming}>
          <div className={styles.heading}>
            <h3>Platforms</h3>
          </div>
          <div className={styles.gamingData}>
            {/* <p className={styles.gamingDataTitle}>This gamer is part of the following platforms: </p> */}
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-nintendoswitch`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Nintendo</span> as <span>Cloud</span></p>
            </div>
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-playstation`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Playstation Network</span> as <span>xCloudyTales</span></p>
            </div>
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-xbox`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Xbox Live</span> as <span>xCloud#4321</span></p>
            </div>
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-epicgames`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Epic Games</span> as <span>Cloud</span></p>
            </div>
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-steam`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Steam</span> as <span>Cloud</span></p>
            </div>
            <div className={styles.platform}>
              <svg className={styles.icon}>
                <use xlinkHref={`${svg}#icon-discord`} />
              </svg>
              <p className={styles.gamingDataInfo}><span>Discord</span> as <span>xCloudFF#1234</span></p>
            </div>
          </div>
        </div>

<span className={styles.genre}>sci-fi</span> {/* PAREI AQUI */}