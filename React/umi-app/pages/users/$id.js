import styles from './$id.css'

export default function({ match }) {
  return (
    <div className={styles.normal}>
      <h1>Page $id</h1>
      <div>{match.params.id}</div>
    </div>
  )
}
