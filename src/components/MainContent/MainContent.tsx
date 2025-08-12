import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTickets } from '../../store/tickets/ticketsSlice'
import type { RootState, AppDispatch } from '../../store'
import TicketCard from './TicketCard'
import styles from './MainContent.module.scss'
import SortTabs from './SortTabs'
import MobileFilters from './MobileFilters'
import { useMedia } from '../../hooks/useMedia'; 
import {
  selectFilteredAndSortedTickets,
  selectTotalFilteredTicketsCount
} from '../../store/tickets/ticketsSelectors'
import { showMoreTickets } from '../../store/tickets/ticketsSlice'

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isTablet = useMedia('(max-width: 768px)')
  const tickets = useSelector(selectFilteredAndSortedTickets)
  const totalCount = useSelector(selectTotalFilteredTicketsCount)
  const visibleCount = useSelector((state: RootState) => state.tickets.visibleCount)
  const status = useSelector((state: RootState) => state.tickets.status)
  const error = useSelector((state: RootState) => state.tickets.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets())
    }
  }, [status, dispatch])

  return (
    <section className={styles.main}>
      <SortTabs />
      {isTablet && <MobileFilters />}
      <div className={styles.cards}>
        {status === 'loading' && <p>Загрузка билетов...</p>}
        {status === 'failed' && <p>Ошибка: {error}</p>}
        {status === 'succeeded' && tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

     
      {visibleCount < totalCount && (
        <button
          className={styles.loadMore}
          onClick={() => dispatch(showMoreTickets())}
        >
          Загрузить ещё билеты
        </button>
      )}
    </section>
  )
}

export default MainContent