import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Ticket } from '../../components/MainContent/Ticket'

const ticketsAdapter = createEntityAdapter<Ticket>()

const initialState = ticketsAdapter.getInitialState({
  status: 'idle',
  error: null as string | null,
  sortBy: 'price' as 'price' | 'duration' | 'optimal',
  stopsFilter: [] as number[],       
  companiesFilter: [] as string[],   
  visibleCount: 3                    
})

export const fetchTickets = createAsyncThunk<Ticket[]>('tickets/fetchTickets', async () => {
  const response = await axios.get<Ticket[]>('http://localhost:3001/tickets')
  return response.data
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
      state.visibleCount += 5
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
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

export default ticketsSlice.reducer