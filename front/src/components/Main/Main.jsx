import { useState, useEffect } from "react";
import classes from "./style.module.css";
import Candle from "../Charts/Candle.jsx";
import SmallCube from "../Cube/Cube.jsx";
import Radar from "../Radar/Radar.jsx";
import CircularProgress from "../CircularProgress/CircularProgress.jsx";
import Detail from "../Detail/Detail.jsx";
import {
  fetchUser,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from "../../Services.js";

export default function Main() {
  const [currentUserId, setCurrentUserId] = useState(12);
  const [currentUser, setCurrentUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  const switchUser = () => {
    const newId = currentUserId === 12 ? 18 : 12;
    setCurrentUserId(newId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userData, activityData, avgSessionsData, performanceData] =
          await Promise.all([
            fetchUser(currentUserId),
            fetchUserActivity(currentUserId),
            fetchUserAverageSessions(currentUserId),
            fetchUserPerformance(currentUserId),
          ]);
        // setData pour les useState
        setCurrentUser(userData);
        setUserActivity(activityData);
        setUserAverageSessions(avgSessionsData);
        setUserPerformance(performanceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  if (loading) {
    return <></>// pour éviter les erreurs lors du premier chargement
  }

  return (
    <section className={classes.cointainerMain}>
      <div className={classes.containerTitle}>
        <h2>Bonjour <p>{currentUser.userInfos.firstName}</p></h2>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <button onClick={switchUser} style={{ cursor: "pointer"}}>
        Cliquez ici pour changer d'utilisateur
      </button>
      </div>

      <Candle userActivity={userActivity} />
      <div className={classes.cointainerSecondary}>
        <SmallCube userAverageSessions={userAverageSessions} />
        <Radar userPerformance={userPerformance} />
        <CircularProgress currentUser={currentUser} />
      </div>
      <Detail currentUser={currentUser} />
    </section>
  );
}
