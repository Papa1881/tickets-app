export interface Ticket {
  id: string
  from: string
  to: string
  company: 'pobeda' | 'redwings' | 's7'
  price: number
  currency: string
  time: {
    start: string
    end: string
  }
  duration: string
  date: string
  connectionAmount: number
}