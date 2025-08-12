import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setCompaniesFilter } from '../../store/tickets/ticketsSlice'
import styles from './CompaniesFilter.module.scss'

const companies = [
  { id: 'pobeda', label: 'Победа' },
  { id: 'redwings', label: 'Red Wings' },
  { id: 's7', label: 'S7 Airlines' }
]

const CompaniesFilter = () => {
  const dispatch = useDispatch()
  const selected = useSelector((state: RootState) => state.tickets.companiesFilter)

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter(c => c !== id)
      : [...selected, id]
    dispatch(setCompaniesFilter(next))
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Компании</h3>

      {companies.map(({ id, label }) => (
        <label key={id} className={styles.option}>
          <input
            className={styles.input}      
            type="checkbox"
            checked={selected.includes(id)}
            onChange={() => toggle(id)}
          />
          <span className={styles.text}>{label}</span>
        </label>
      ))}
    </div>
  )
}

export default CompaniesFilter