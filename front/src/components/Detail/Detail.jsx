import classes from "./style.module.css";
import caloriesIcon from "../../img/calories-icon.png";
import proteinIcon from "../../img/protein-icon.png";
import carbsIcon from "../../img/carbs-icon.png";
import fatIcon from "../../img/fat-icon.png";

const keyDataImages = {
  calorieCount: caloriesIcon,
  proteinCount: proteinIcon,
  carbohydrateCount: carbsIcon,
  lipidCount: fatIcon,
};

const keyDataLabels = {
  calorieCount: "Calories",
  proteinCount: "Proteines",
  carbohydrateCount: "Glucides",
  lipidCount: "Lipides",
};

export default function Detail({ mock, userId }) {
  const userData = mock.USER_MAIN_DATA.find(user => user.id === userId);
  
  const keyData = userData.keyData;

  return (
    <section className={classes.mainDataContainer}>
      <div>
        <div className={classes.cardFlex}>
          {Object.entries(keyData).map(([key, value]) => (
            <div key={key} className={classes.keyDataItem}>
              <img
                src={keyDataImages[key]}
                alt={keyDataLabels[key]}
                className={classes.keyDataImage}
              />
              <div className={classes.keyDataDiv}>
                <p className={classes.keyDataBoldText}>
                  {key === "calorieCount"
                    ? `${Number(value).toLocaleString("en-US")} Kcal`
                    : `${value} g`}
                </p>
                <p className={classes.keyDataText}>{keyDataLabels[key]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
