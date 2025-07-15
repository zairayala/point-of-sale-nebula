export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

export type ProductItem = Product & {
  quantity: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Leche Entera 1L",
    price: 3.5,
    image: "/placeholder.svg?height=200&width=200",
    category: "lácteos",
    stock: 5,
  },
  {
    id: "2",
    name: "Pan Integral 500g",
    price: 2.2,
    image: "/placeholder.svg?height=200&width=200",
    category: "panadería",
    stock: 15,
  },
  {
    id: "3",
    name: "Arroz Premium 1kg",
    price: 4.75,
    image: "/placeholder.svg?height=200&width=200",
    category: "abarrotes",
    stock: 30,
  },
  {
    id: "4",
    name: "Aceite de Oliva 500ml",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "abarrotes",
    stock: 12,
  },
  {
    id: "5",
    name: "Huevos Orgánicos 12",
    price: 5.5,
    image: "/placeholder.svg?height=200&width=200",
    category: "lácteos",
    stock: 20,
  },
  {
    id: "6",
    name: "Pasta de Trigo Integral 500g",
    price: 2.8,
    image: "/placeholder.svg?height=200&width=200",
    category: "abarrotes",
    stock: 18,
  },
  {
    id: "7",
    name: "Yogurt Natural 1kg",
    price: 4.25,
    image: "/placeholder.svg?height=200&width=200",
    category: "lácteos",
    stock: 15,
  },
  {
    id: "8",
    name: "Café Molido Premium 250g",
    price: 7.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "bebidas",
    stock: 10,
  },
  {
    id: "9",
    name: "Galletas Integrales 200g",
    price: 3.25,
    image: "/placeholder.svg?height=200&width=200",
    category: "snacks",
    stock: 22,
  },
  {
    id: "10",
    name: "Agua Mineral 1.5L",
    price: 1.5,
    image: "/placeholder.svg?height=200&width=200",
    category: "bebidas",
    stock: 40,
  },
  {
    id: "11",
    name: "Manzanas Rojas (1kg)",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "frutas",
    stock: 15,
  },
  {
    id: "12",
    name: "Plátanos Orgánicos (1kg)",
    price: 2.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "frutas",
    stock: 20,
  },
  {
    id: "13",
    name: "Tomates (1kg)",
    price: 2.49,
    image: "/placeholder.svg?height=200&width=200",
    category: "verduras",
    stock: 18,
  },
  {
    id: "14",
    name: "Papel Higiénico (12 rollos)",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "hogar",
    stock: 25,
  },
  {
    id: "15",
    name: "Detergente Líquido 1L",
    price: 5.75,
    image: "/placeholder.svg?height=200&width=200",
    category: "limpieza",
    stock: 15,
  },
  {
    id: "16",
    name: "Jabón de Baño (pack 3)",
    price: 4.5,
    image: "/placeholder.svg?height=200&width=200",
    category: "higiene",
    stock: 30,
  },
]
