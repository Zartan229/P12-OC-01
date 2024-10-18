import classes from "./style.module.css";
import mock from '../../Mock.js'
import Candle from '../Charts/Candle.jsx'
import SmallCube from '../Cube/Cube.jsx'
import Radar from '../Radar/Radar.jsx'

export default function Main() {
  return (
    <section className={classes.cointainerMain}>
        <div className={classes.containerTitle}>
          <h2>Bonjour {mock.USER_MAIN_DATA[0].userInfos.firstName}</h2>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
      <Candle mock={mock}/>
      <div className={classes.cointainerSecondary}>
      <SmallCube mock={mock}/>
      <Radar mock={mock}/>
      </div>
    </section>
  );
}
