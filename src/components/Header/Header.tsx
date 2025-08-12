import styles from './Header.module.scss'
import planeLogo from '../../assets/image6.svg'

const Header = () => (
  <header className={styles.header}>
  <img src={planeLogo} alt="" className={styles.logo} />
  <h1 className={styles.title}>Поиск авиабилетов</h1>
</header>
)

export default Header