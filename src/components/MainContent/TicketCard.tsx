import styles from './TicketCard.module.scss'
import type { Ticket } from '../MainContent/Ticket'

import PobedaLogo from '../../assets/pobeda.png'
import RedWingsLogo from '../../assets/redwings.png'
import S7Logo from '../../assets/s7.png'

type Props = {
  ticket: Ticket
}

const TicketCard = ({ ticket }: Props) => {
  const getCompanyLogo = () => {
    switch (ticket.company.toLowerCase()) {
      case 'pobeda': return PobedaLogo
      case 'redwings': return RedWingsLogo
      case 's7': return S7Logo
      default: return ''
    }
  }

  const getStopsText = (amount: number | null) => {
    if (!amount) return 'Без пересадок'
    if (amount === 1) return '1 пересадка'
    return `${amount} пересадки`
  }

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h} ч ${m} мин`
  }

  return (
  <div className={styles.card}>
    <div className={styles.top}>
      <div className={styles.price}>{ticket.price.toLocaleString()} P</div>
      <img
        src={getCompanyLogo()}
        alt={ticket.company}
        className={styles.logo}
      />
    </div>
    <div className={styles.info}>
      <div>
        <div className={styles.route}>{ticket.from} - {ticket.to}</div>
        <div className={styles.time}>{ticket.time.startTime} - {ticket.time.endTime}</div>
      </div>
      <div>
        <div className={styles.label}>В пути</div>
        <div>{formatDuration(ticket.duration)}</div>
      </div>
      <div>
        <div className={styles.label}>Пересадки</div>
        <div>{getStopsText(ticket.connectionAmount)}</div>
      </div>
    </div>
  </div>
)
}

export default TicketCard