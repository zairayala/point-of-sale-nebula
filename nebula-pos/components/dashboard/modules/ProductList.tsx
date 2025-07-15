"use client"
import { formatPrice } from '@/lib/utils'
import { Product } from './products-data'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCartStore } from '@/src/cartStore'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

import { Button } from '@/components/ui/button'
export default function ProductList({ products }: { products: Product[] }) {
  const { items, increaseQuantity, decreaseQuantity, addToCart, deleteFromCart } = useCartStore()
  const itemExists = (product: Product) => items.find(item => item.id === product.id)
  return (
    <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
      
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 text-slate-600 text-sm font-semibold border-b border-slate-300">
            <TableHead className="font-semibold text-slate-700">Producto</TableHead>
            <TableHead className="font-semibold text-slate-700">Código</TableHead>
            <TableHead className="font-semibold text-slate-700">Categoría</TableHead>
            <TableHead className="font-semibold text-slate-700">Precio</TableHead>
            <TableHead className="font-semibold text-slate-700">Stock</TableHead>
            <TableHead className="font-semibold text-slate-700">Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const cartItem = itemExists(product)
            return (
              <TableRow key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                <TableCell className="font-medium text-slate-700">{product.name}</TableCell>
                <TableCell className="font-mono text-sm text-slate-600">{product.id}</TableCell>
                <TableCell>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-xl font-medium inline-flex">
                    {product.category}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-emerald-600">{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-xl font-medium inline-flex ${product.stock < 10
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "text-emerald-600 border bg-emerald-50 border-emerald-200"
                      }`}
                  >
                    {product.stock} unid.
                  </span>

                </TableCell>
                <TableCell>
                  {itemExists(product) ? (
                    <Button
                      variant="outline"
                      className="bg-emerald-50 hover:bg-red-50 text-emerald-700 hover:text-red-700 border-emerald-200 hover:border-red-200 transition-colors duration-200 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteFromCart(product.id)
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      <span className="font-medium">En carrito</span>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span className="font-medium">Agregar</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
