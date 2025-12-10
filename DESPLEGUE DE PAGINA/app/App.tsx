"use client"

import { useState } from "react"
import type { User, Product, Design, CartItem, Order } from "@/lib/types/apparel"
import { AuthForm } from "@/components/AuthForm"
import { ProductCatalog } from "@/components/ProductCatalog"
import { DesignEditor } from "@/components/DesignEditor"
import { PaymentGateway } from "@/components/PaymentGateway"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, LogOut, UserIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

type View = "auth" | "catalog" | "editor" | "cart" | "payment" | "success"

const PRODUCTS: Product[] = [
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

export default function App() {
  const [currentView, setCurrentView] = useState<View>("auth")
  const [user, setUser] = useState<User | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)

  const handleLogin = (email: string, name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
    }
    setUser(newUser)
    setCurrentView("catalog")
  }

  const handleLogout = () => {
    setUser(null)
    setCartItems([])
    setCurrentView("auth")
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView("editor")
  }

  const handleSaveDesign = (design: Design) => {
    if (!selectedProduct) return

    const cartItem: CartItem = {
      id: `cart-${Date.now()}`,
      design,
      product: selectedProduct,
      quantity: 1,
      price: selectedProduct.basePrice,
    }

    setCartItems([...cartItems, cartItem])
    setSelectedProduct(null)
    setCurrentView("cart")
  }

  const handleCompleteOrder = (order: Order) => {
    setCompletedOrder(order)
    setCartItems([])
    setCurrentView("success")
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (currentView === "auth") {
    return <AuthForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("catalog")}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              LJ
            </div>
            <h1 className="text-xl font-bold text-foreground">LionsJLW</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon size={18} />
              <span>{user?.name}</span>
            </div>

            <Button variant="outline" size="sm" onClick={() => setCurrentView("cart")} className="relative">
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      {currentView === "catalog" && <ProductCatalog products={PRODUCTS} onSelectProduct={handleSelectProduct} />}

      {currentView === "editor" && selectedProduct && user && (
        <DesignEditor
          product={selectedProduct}
          onSave={handleSaveDesign}
          onBack={() => {
            setSelectedProduct(null)
            setCurrentView("catalog")
          }}
          userId={user.id}
        />
      )}

      {currentView === "cart" && (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <Button variant="outline" onClick={() => setCurrentView("catalog")}>
              Seguir Comprando
            </Button>
          </div>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-muted-foreground mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground mb-6">Agrega productos personalizados a tu carrito</p>
              <Button onClick={() => setCurrentView("catalog")}>Ver Productos</Button>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-sm text-muted-foreground text-center">
                          Diseño
                          <br />
                          Personalizado
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Color personalizado • {item.design.elements.length} elementos
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  setCartItems(
                                    cartItems.map((ci) =>
                                      ci.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci,
                                    ),
                                  )
                                }
                              }}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCartItems(
                                  cartItems.map((ci) =>
                                    ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
                                  ),
                                )
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCartItems(cartItems.filter((ci) => ci.id !== item.id))}
                            className="text-destructive"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío estimado</span>
                    <span>$9.99</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Estimado</span>
                    <span>
                      ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 9.99).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => user && setCurrentView("payment")}>
                  Proceder al Pago
                </Button>
              </Card>
            </>
          )}
        </div>
      )}

      {currentView === "payment" && user && (
        <PaymentGateway
          cartItems={cartItems}
          onComplete={handleCompleteOrder}
          onBack={() => setCurrentView("cart")}
          userId={user.id}
        />
      )}

      {currentView === "success" && completedOrder && (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-bold">¡Gracias por tu compra!</h1>
              <p className="text-muted-foreground mt-2">Tu pedido #{completedOrder.id.slice(-8)} ha sido confirmado</p>
            </div>

            <div className="bg-muted rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total pagado</span>
                <span className="font-semibold">${completedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artículos</span>
                <span>{completedOrder.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de pago</span>
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado</span>
                <Badge>Procesando</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Hemos enviado la confirmación a tu correo electrónico</p>
              <p className="text-sm text-muted-foreground">Tiempo estimado de entrega: 5-7 días hábiles</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setCurrentView("catalog")}>
                Seguir Comprando
              </Button>
              <Button onClick={() => window.print()}>Descargar Factura</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
