import type { RootState } from '../index'
import { selectAllTickets } from './ticketsSlice'

export const selectFilteredAndSortedTickets = (state: RootState) => {
  const tickets = selectAllTickets(state)
  const sortBy = state.tickets.sortBy
  const stopsFilter = state.tickets.stopsFilter
  const companiesFilter = state.tickets.companiesFilter
  const visibleCount = state.tickets.visibleCount

  const filteredByStops = stopsFilter.length
    ? tickets.filter(ticket => stopsFilter.includes(ticket.connectionAmount || 0))
    : tickets

  const filteredByCompanies = companiesFilter.length
    ? filteredByStops.filter(ticket => companiesFilter.includes(ticket.company))
    : filteredByStops

  const sortedTickets = [...filteredByCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'duration':
        return a.duration - b.duration
      case 'optimal':
        return (a.price + a.duration) - (b.price + b.duration)
      default:
        return 0
    }
  })

  return sortedTickets.slice(0, visibleCount)
}

export const selectTotalFilteredTicketsCount = (state: RootState) => {
  const tickets = selectAllTickets(state)
  const stopsFilter = state.tickets.stopsFilter
  const companiesFilter = state.tickets.companiesFilter

  const filteredByStops = stopsFilter.length
    ? tickets.filter(ticket => stopsFilter.includes(ticket.connectionAmount || 0))
    : tickets

  const filteredByCompanies = companiesFilter.length
    ? filteredByStops.filter(ticket => companiesFilter.includes(ticket.company))
    : filteredByStops

  return filteredByCompanies.length
}