import styles from './Sidebar.module.scss'
import StopsFilter from './StopsFilter'
import CompaniesFilter from './CompaniesFilter'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <StopsFilter />
      <CompaniesFilter />
    </aside>
  )
}

export default Sidebar