export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  type: "tshirt" | "hoodie" | "tank" | "sweatshirt"
  basePrice: number
  colors: string[]
  image: string
}

export interface DesignElement {
  id: string
  type: "text" | "emoji" | "sticker" | "image"
  content: string
  x: number
  y: number
  fontSize: number
  color: string
  rotation: number
  opacity: number
}

export interface Design {
  id: string
  canvasColor: string
  elements: DesignElement[]
  backgroundImage?: string
  createdAt: Date
}

export interface CartItem {
  id: string
  design: Design
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  paymentMethod: string
  createdAt: Date
}
