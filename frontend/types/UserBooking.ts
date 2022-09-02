import { OfferedService } from "./OfferedService"

export interface UserBooking {
  id: string
  note:string
  status: string
  payAmount:number
  offeredService:OfferedService
}