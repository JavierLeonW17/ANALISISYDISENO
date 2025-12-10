"use client"

import type React from "react"

import { useState } from "react"
import type { CartItem, Order } from "@/lib/types/apparel"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"

interface PaymentGatewayProps {
  cartItems: CartItem[]
  onComplete: (order: Order) => void
  onBack: () => void
  userId: string
}

export function PaymentGateway({ cartItems, onComplete, onBack, userId }: PaymentGatewayProps) {
  const [step, setStep] = useState<"shipping" | "payment" | "processing">("shipping")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Shipping form state
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })

  // Payment form state
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping_cost = 9.99
  const total = subtotal + shipping_cost

  const validateShipping = () => {
    if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.postalCode) {
      setError("Por favor completa todos los campos de envío")
      return false
    }
    return true
  }

  const validatePayment = () => {
    if (!payment.cardName || !payment.cardNumber || !payment.expiry || !payment.cvv) {
      setError("Por favor completa todos los datos de pago")
      return false
    }
    if (payment.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("El número de tarjeta debe tener 16 dígitos")
      return false
    }
    if (payment.cvv.length !== 3) {
      setError("El CVV debe tener 3 dígitos")
      return false
    }
    return true
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (validateShipping()) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (validatePayment()) {
      setStep("processing")
      setLoading(true)
      // Simulate payment processing
      setTimeout(() => {
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items: cartItems,
          total,
          paymentMethod: `Visa terminada en ${payment.cardNumber.slice(-4)}`,
          createdAt: new Date(),
        }
        setLoading(false)
        onComplete(order)
      }, 2000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-background via-secondary/30 to-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Completar Pago</h1>
          <p className="text-muted-foreground mt-2">
            Paso {step === "shipping" ? "1" : step === "payment" ? "2" : "3"} de 3
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-2 mb-8">
          {(["shipping", "payment", "processing"] as const).map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${
                step === "shipping" && i === 0
                  ? "bg-primary"
                  : step === "payment" && i <= 1
                    ? "bg-primary"
                    : step === "processing"
                      ? "bg-primary"
                      : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "shipping" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Información de Envío</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Dirección</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Ciudad</label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
                      <input
                        type="text"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Código Postal</label>
                    <input
                      type="text"
                      value={shipping.postalCode}
                      onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={onBack} type="button" className="flex-1 bg-transparent">
                      Volver
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continuar al Pago
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {step === "payment" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Información de Pago</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 16)
                        setPayment({ ...payment, cardNumber: val })
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Vencimiento (MM/YY)</label>
                      <input
                        type="text"
                        value={payment.expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                          setPayment({ ...payment, expiry: val })
                        }}
                        placeholder="1225"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                      <input
                        type="text"
                        value={payment.cvv}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 3)
                          setPayment({ ...payment, cvv: val })
                        }}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep("shipping")} type="button" className="flex-1">
                      Atrás
                    </Button>
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? "Procesando..." : "Confirmar y Pagar"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {step === "processing" && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Procesando tu pago...</h2>
                <p className="text-muted-foreground">Por favor espera mientras confirmamos tu pedido</p>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Resumen del Pedido</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>${shipping_cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
