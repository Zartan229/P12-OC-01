import classes from "./style.module.css";
import Icons from "../Icons/Icons.jsx"
import bike from "../../img/bike.png"
import swim from "../../img/swim.png"
import yoga from "../../img/yoga.png"
import weight from "../../img/weight.png"

const images = [
    { src: yoga, alt: "Yoga" },
    { src: swim, alt: "Swim" },
    { src: bike, alt: "Bike" },
    { src: weight, alt: "Weight" }
  ];


export default function Aside() {
  return (
    <aside className={classes.Aside}>
        <Icons images={images}/>
        <small className={classes.copyright}>Copiryght, SportSee 2020</small> 
    </aside>
  );
}
