"use client"

import type { Product } from "../types/apparel"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Sparkles, ArrowRight } from "lucide-react"

interface ProductCatalogProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function ProductCatalog({ products, onSelectProduct }: ProductCatalogProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-background via-secondary/30 to-background py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Diseña tu Estilo Único</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Crea Prendas Personalizadas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige tu prenda y personalízala con nuestro poderoso editor de estampados
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-muted to-secondary overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Product Info */}
              <div className="flex-1 p-5 flex flex-col">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                {/* Color Swatches */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Colores disponibles</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-auto space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">${product.basePrice}</span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>

                  <Button onClick={() => onSelectProduct(product)} className="w-full group">
                    Personalizar
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground">Crea diseños únicos y comparte tu creatividad con el mundo</p>
        </div>
      </div>
    </div>
  )
}
