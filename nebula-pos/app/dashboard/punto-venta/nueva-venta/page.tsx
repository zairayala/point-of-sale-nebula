import { products } from '@/components/dashboard/modules/products-data'
import ProductClient from '@/components/dashboard/modules/ProductClient';

export default function NuevaVentaPage() {
  return (
    <ProductClient products={products} />
  )
}
