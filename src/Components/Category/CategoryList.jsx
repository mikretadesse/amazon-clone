import Category from "./Category";
import styles from "./Category.module.css";
import { categories } from "./data.js";

const CategoryList = () => {
  return (
    <section className={styles.listWrapper}>
      <div className={styles.container}>
        {categories.map((cat, index) => (
          <Category key={index} title={cat.title} image={cat.imageLink} />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
