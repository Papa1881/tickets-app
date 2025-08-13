import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ticket } from '../../components/MainContent/Ticket'
import raw from '../../mock/db.json'

type TicketsFile = { tickets: Ticket[] }  // описываем форму json

export const fetchTickets = createAsyncThunk<Ticket[]>(
  'tickets/fetchTickets',
  async () => {
    // Возвращаем именно массив билетов, а не объект целиком
    const data = raw as unknown as TicketsFile
    // эмулируем сеть, можно убрать setTimeout
    return new Promise<Ticket[]>((resolve) => {
      setTimeout(() => resolve(data.tickets), 200)
    })
  }
)



const ticketsAdapter = createEntityAdapter<Ticket>()

const initialState = ticketsAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
  sortBy: 'price' as 'price' | 'duration' | 'optimal',
  stopsFilter: [] as number[],
  companiesFilter: [] as string[],
  visibleCount: 3, // по макету сначала 3
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<'price' | 'duration' | 'optimal'>) {
      state.sortBy = action.payload
    },
    setStopsFilter(state, action: PayloadAction<number[]>) {
      state.stopsFilter = action.payload
    },
    setCompaniesFilter(state, action: PayloadAction<string[]>) {
      state.companiesFilter = action.payload
    },
    showMoreTickets(state) {
      state.visibleCount += 3 // по макету догружаем по 3
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        ticketsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export default ticketsSlice.reducer

export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById
} = ticketsAdapter.getSelectors((state: any) => state.tickets)

export const {
  setSortBy,
  setStopsFilter,
  setCompaniesFilter,
  showMoreTickets
} = ticketsSlice.actions
