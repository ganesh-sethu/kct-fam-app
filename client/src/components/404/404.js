import image from "../../img/404.png";
import styles from "./styles.module.css";
export default function PageNotFound() {
  return <img alt="404" className={styles.img} src={image} />;
}
