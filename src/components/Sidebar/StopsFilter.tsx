import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setStopsFilter } from '../../store/tickets/ticketsSlice'
import styles from './StopsFilter.module.scss'

const stopsOptions = [0, 1, 2, 3]

const StopsFilter = () => {
  const dispatch = useDispatch()
  const selectedStops = useSelector((state: RootState) => state.tickets.stopsFilter)

  const handleChange = (stop: number) => {
    let newStops: number[]

    if (selectedStops.includes(stop)) {
      newStops = selectedStops.filter((s) => s !== stop)
    } else {
      newStops = [...selectedStops, stop]
    }

    dispatch(setStopsFilter(newStops))
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Количество пересадок</h3>
      {stopsOptions.map((stop) => (
        <label key={stop}>
          <input
            type="checkbox"
            checked={selectedStops.includes(stop)}
            onChange={() => handleChange(stop)}
          />
          {stop === 0 ? 'Без пересадок' : `${stop} пересадка${stop > 1 ? 'и' : ''}`}
        </label>
      ))}
    </div>
  )
}

export default StopsFilter