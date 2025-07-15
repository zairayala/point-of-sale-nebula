"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import ProductFilter from "./ProductFilter"
import ProductList from "./ProductList"
import ProductCart from "./ProductCart"
import { Product } from "./products-data"

export default function ProductClient({ products }: { products: Product[] }) {
    const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]
    return (
        <div className="grid grid-cols-[5fr_2fr]">
            <ScrollArea className="h-[calc(100vh-64px)]">
                <div className="gap-8 flex flex-col p-8">
                    <ProductFilter categories={categories} />
                    <ProductList products={products} />
                </div>
            </ScrollArea>
                <div>
                    <ProductCart />
                </div>
        </div>
    )
}
