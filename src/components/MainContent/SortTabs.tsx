import { useDispatch, useSelector } from 'react-redux'
import { setSortBy } from '../../store/tickets/ticketsSlice'
import type { RootState } from '../../store'
import styles from './SortTabs.module.scss'

const tabs = [
  { id: 'price', label: 'Самый дешевый' },
  { id: 'duration', label: 'Самый быстрый' },
  { id: 'optimal', label: 'Самый оптимальный' }
] as const

const SortTabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state: RootState) => state.tickets.sortBy)

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => dispatch(setSortBy(tab.id))}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SortTabs