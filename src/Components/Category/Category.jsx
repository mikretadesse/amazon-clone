import styles from "./Category.module.css";

const Category = ({ title, image }) => {
  return (
    <a href="#" className={styles.linkWrapper}>
      <div className={styles.category}>
        <h3 className={styles.title}>{title}</h3>
        <img src={image} alt={title} className={styles.image} />
        <button className={styles.button}>Shop now</button>
      </div>
    </a>
  );
};

export default Category;
