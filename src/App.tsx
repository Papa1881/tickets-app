import styles from './App.module.scss'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import MainContent from './components/MainContent/MainContent'
import TicketCard from '../src/components/MainContent/TicketCard'
import CompaniesFilter from './components/Sidebar/CompaniesFilter'

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

export default App