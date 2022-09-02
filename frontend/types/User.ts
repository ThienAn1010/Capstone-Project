export interface User {
  id: string
  username: string
  name: string
  picture: string
  role: "user" | "paperMaker"
  phoneNumber?: string
  address?: string
  lat?: number
  long?: number
}
