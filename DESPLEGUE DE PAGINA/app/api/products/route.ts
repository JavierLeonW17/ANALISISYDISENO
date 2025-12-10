import { NextResponse } from "next/server"

const PRODUCTS = [
  {
    id: "tshirt-1",
    name: "Camiseta Básica",
    type: "tshirt",
    basePrice: 19.99,
    colors: ["#FFFFFF", "#000000", "#1E3A8A", "#DC2626", "#059669"],
    image:
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3NjIzMjM2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "hoodie-1",
    name: "Sudadera con Capucha",
    type: "hoodie",
    basePrice: 39.99,
    colors: ["#000000", "#374151", "#1E3A8A", "#7C2D12"],
    image:
      "https://images.unsplash.com/photo-1609864810463-36aef415eded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMG1vY2t1cHxlbnwxfHx8fDE3NjIzODQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "tank-1",
    name: "Camiseta Sin Mangas",
    type: "tank",
    basePrice: 16.99,
    colors: ["#FFFFFF", "#000000", "#374151", "#DC2626"],
    image:
      "https://images.unsplash.com/photo-1719421978016-a03df5640e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5rJTIwdG9wJTIwbW9ja3VwfGVufDF8fHx8MTc2MjM5NTk3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "sweatshirt-1",
    name: "Sudadera Clásica",
    type: "sweatshirt",
    basePrice: 34.99,
    colors: ["#374151", "#000000", "#1E3A8A", "#FFFFFF"],
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdHNoaXJ0JTIwbW9ja3VwfGVufDF8fHx8MTc2MjM5NTk3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
]

export async function GET() {
  return NextResponse.json(PRODUCTS)
}
