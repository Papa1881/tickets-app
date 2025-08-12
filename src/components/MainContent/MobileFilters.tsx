import {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import type {RootState} from '../../store'
import {setCompaniesFilter, setStopsFilter} from '../../store/tickets/ticketsSlice'
import styles from './MobileFilters.module.scss'
import arrowDown from '../../assets/image7.png'

const COMPANIES = [
  { id: 'pobeda',   label: 'Победа' },
  { id: 'redwings', label: 'Red Wings' },
  { id: 's7',       label: 'S7 Airlines' },
]

const STOPS = [
  { v: 0, label: 'Без пересадок' },
  { v: 1, label: '1 пересадка'   },
  { v: 2, label: '2 пересадки'   },
  { v: 3, label: '3 пересадки'   },
]

export default function MobileFilters() {
  const dispatch = useDispatch()
  const selectedCompanies = useSelector((s: RootState) => s.tickets.companiesFilter)
  const selectedStops     = useSelector((s: RootState) => s.tickets.stopsFilter)
  const [open, setOpen]   = useState(true)

  const headerText = useMemo(
    () => 'Любая авиакомпания, любое кол-во пересадок',
    []
  )

  const toggle = () => setOpen(p => !p)

  const toggleCompany = (id: string) => {
    const next = selectedCompanies.includes(id)
      ? selectedCompanies.filter(c => c !== id)
      : [...selectedCompanies, id]
    dispatch(setCompaniesFilter(next))
  }

  const toggleStop = (v: number) => {
    const next = selectedStops.includes(v)
      ? selectedStops.filter(s => s !== v)
      : [...selectedStops, v]
    dispatch(setStopsFilter(next))
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.head} onClick={toggle} type="button">
        <span className={styles.title}>{headerText}</span>
        <span className={styles.action}>
          {open ? 'Скрыть настройки' : 'Открыть настройки'}
          <img src={arrowDown} alt="" className={styles.chevron} />
        </span>
      </button>

      <div className={`${styles.body} ${open ? styles.bodyOpen : ''}`}>
        <div className={styles.col}>
          <div className={styles.colTitle}>Компании</div>
          <div className={styles.list}>
            {COMPANIES.map(c => (
              <label key={c.id} className={styles.row}>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(c.id)}
                  onChange={() => toggleCompany(c.id)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.colTitle}>Количество пересадок</div>
          <div className={styles.list}>
            {STOPS.map(s => (
              <label key={s.v} className={styles.row}>
                <input
                  type="checkbox"
                  checked={selectedStops.includes(s.v)}
                  onChange={() => toggleStop(s.v)}
                />
                <span>{s.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}