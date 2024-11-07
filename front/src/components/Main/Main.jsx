import { useState, useEffect } from "react";
import classes from "./style.module.css";
import mock from '../../Mock.js';
import Candle from '../Charts/Candle.jsx';
import SmallCube from '../Cube/Cube.jsx';
import Radar from '../Radar/Radar.jsx';
import CircularProgress from "../CircularProgress/CircularProgress.jsx";
import Detail from '../Detail/Detail.jsx';

console.log(mock);

export default function Main() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(mock.USER_MAIN_DATA[0]);

  const switchUser = () => {
    const newIndex = currentUserIndex === 0 ? 1 : 0;
    setCurrentUserIndex(newIndex);
  };

  useEffect(() => {
    setCurrentUser(mock.USER_MAIN_DATA[currentUserIndex]);
  }, [currentUserIndex]);

  return (
    <section className={classes.cointainerMain}>
      <div className={classes.containerTitle}>
        <h2>Bonjour {currentUser.userInfos.firstName}</h2>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div onClick={switchUser} style={{ cursor: 'pointer', color: 'blue' }}>
        CLICK HERE TO SWITCH
      </div>
      <Candle mock={mock} userId={currentUser.id} />
      <div className={classes.cointainerSecondary}>
        <SmallCube mock={mock} userId={currentUser.id} />
        <Radar mock={mock} userId={currentUser.id} />
        <CircularProgress mock={mock} userId={currentUser.id} />
      </div>
      <Detail mock={mock} userId={currentUser.id} />
    </section>
  );
}
