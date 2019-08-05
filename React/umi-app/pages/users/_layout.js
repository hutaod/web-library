
import styles from './_layout.css';

export default function(props) {
  return (
    <div className={styles.normal}>
      <h1>Layout for users</h1>
      {
        props.children
      }
    </div>
  );
}
