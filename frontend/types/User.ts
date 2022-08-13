export interface User {
  id: string
  username: string
  password: string
  name: string
  picture: string
  role: "user" | "paperMaker"
  phoneNumber?: string
  address?: string
}
