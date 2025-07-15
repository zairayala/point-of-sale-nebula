"use client";
import { useState, useMemo } from "react";
import { useCartStore } from "@/src/cartStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingCart,
  User,
  X,
  Minus,
  Plus,
  Banknote,
  CreditCard,
  Smartphone,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ProductCart() {
  const [customerName, setCustomerName] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("cash");

  const { items: cartItems, increaseQuantity, decreaseQuantity, deleteFromCart, clearCart } =
    useCartStore();

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-slate-100 border border-slate-300 shadow-sm flex flex-col min-h-0">
      <Separator orientation="horizontal" className="h-full" />
      {/* Header */}
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
          </div>
          <button onClick={clearCart} className="hover:text-white/80">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-emerald-100 text-sm">
          {cartItems.length} productos • Vendedor: Shacri
        </p>
      </div>

      {/* Products List */}
      <div className="flex-1 min-h-0  overflow-auto">
        {cartItems.length === 0 ? (
          <div className=" flex w-full h-full items-center justify-center text-gray-400">
            <div className="flex flex-col items-center justify-center">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p className="text-center">Carrito vacío</p>

            </div>
          </div>
        ) : (
          <ScrollArea className="h-full ">
            <div className="divide-y divide-gray-100">
              {cartItems.map((product) => (
                <div className="grid grid-cols-[3fr_1fr_2fr] gap-3 items-center p-3 border-b border-slate-200" key={product.id}>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-md font-medium inline-flex">{product.category}</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex rounded-md overflow-hidden border">
                      <button
                        className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        className="w-10 text-center border-x bg-white"
                        value={product.quantity}
                      />
                      <button
                        className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        onClick={() => increaseQuantity(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <div>
                      <div className="font-medium text-right">{formatPrice(product.price * product.quantity)}</div>
                    </div>
                    <button className="hover:text-red-400 text-red-500 transition-colors" onClick={() => deleteFromCart(product.id)}>
                      <Trash2 className="h-4 w-4 " />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

        )}
      </div>

      {/* Customer & Payment */}
      {cartItems.length > 0 && (
        <div className=" border-t p-4 space-y-4 shrink-0">
          {/* Customer */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Cliente</span>
            </div>
            <Input
              placeholder="Nombre del cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-10"
            />
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Método de pago</p>
            <div className="flex gap-2">
              {[
                { id: "cash", icon: Banknote, label: "Efectivo" },
                { id: "card", icon: CreditCard, label: "Tarjeta" },
                { id: "mobile", icon: Smartphone, label: "Móvil" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedPayment(id)}
                  className={`flex-1 p-3 rounded-lg border-2 text-sm font-medium flex flex-col items-center transition-all ${selectedPayment === id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 hover:border-slate-300 text-gray-700"
                    }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Impuestos (18%)</span>
              <span>{formatPrice(taxes)}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-800 border-t pt-2">
              <span>Total a pagar</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={clearCart}
              variant="outline"
              className="bg-white border border-slate-300 text-gray-800 hover:bg-slate-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Resetear
            </Button>
            <Button className=" text-white ">
              <CreditCard className="w-4 h-4 mr-2" />
              Pagar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
