import { Link } from "react-router-dom";
import styles from "./Category.module.css";

const Category = ({ title, image, name }) => {
  return (
    <Link
      to={`/category/${encodeURIComponent(name)}`}
      className={styles.linkWrapper}>
      <div className={styles.category}>
        <h3 className={styles.title}>{title}</h3>
        <img src={image} alt={title} className={styles.image} />
        <button className={styles.button}>Shop now</button>
      </div>
    </Link>
  );
};

export default Category;
