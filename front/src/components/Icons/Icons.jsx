import classes from "./style.module.css";

export default function Icons({images}) {
  return (
    <div className={classes.iconContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={classes.icon} />
      ))}
    </div>
  );
}
