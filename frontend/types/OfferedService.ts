import { Service } from "./Service"
import { User } from "./User"

export interface OfferedService {
  createdAt: string
  duration: number
  id: string
  paperMaker: {
    address: string
    id: string
    isConfirmed: boolean
    lat: number
    long: number
    pastSuccessfulCases: number
    rating: number
    status: string
    totalCases: number
    user: User
    aboutMe?: string
  }
  paperMakerId: string
  price: number
  service: Service
  serviceId: string
  description: string
  documents: string
  estimate: string
  thumbnail: string
}
