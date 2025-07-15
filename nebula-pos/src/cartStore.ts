import { Product, ProductItem } from '@/components/dashboard/modules/products-data'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CartState = {
    items: ProductItem[],
    addToCart: (product: Product) => void,
    increaseQuantity: (product: Product) => void,
    decreaseQuantity: (id: ProductItem['id']) => void,
    deleteFromCart: (id: ProductItem['id']) => void,
    clearCart: () => void
}
const MIN_ITEMS = 1
export const useCartStore = create<CartState>()(
    devtools(
        (set) => ({
            items: [],
            addToCart: (product) => {
                set((state) => {
                  const exists = state.items.some(item => item.id === product.id);
                  if (exists) return state;
                  return {
                    items: [...state.items, { ...product, quantity: 1 }],
                  };
                });
              },              
            increaseQuantity: (product) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    } else {
                        return {
                            items: [...state.items, { ...product, quantity: 1 }],
                        };
                    }
                });
            },
            decreaseQuantity: (id) => {
                set((state) => ({
                    items: state.items.map(item => {
                        if (item.id === id) {
                            const newQuantity = item.quantity - 1
                            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
                        }
                        return item
                    }).filter((item): item is ProductItem => item !== null)
                }))
            },
            deleteFromCart: (id) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== id)
                }))
            },
            clearCart: () => {
                set(() => ({
                    items: []
                }))
            }
        })
    ))