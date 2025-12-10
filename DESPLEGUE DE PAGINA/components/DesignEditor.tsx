"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Product, Design, DesignElement } from "@/lib/types/apparel"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { AlertCircle, Copy, Trash2, Eye, EyeOff, Plus, Download } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"

interface DesignEditorProps {
  product: Product
  onSave: (design: Design) => void
  onBack: () => void
  userId: string
}

const STICKER_CATEGORIES = {
  anime: ["😻", "🎌", "✨", "🌸", "🎎"],
  manga: ["💥", "🌙", "⭐", "🎀", "✦"],
  kawaii: ["🍓", "🍑", "🍰", "🎀", "✨"],
  cartoon: ["😄", "😎", "🤖", "👾", "🎮"],
  geek: ["💻", "📱", "🔧", "⚡", "🚀"],
}

const COLORS = [
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Negro", hex: "#000000" },
  { name: "Gris", hex: "#6B7280" },
  { name: "Púrpura", hex: "#8B5CF6" },
  { name: "Azul", hex: "#3B82F6" },
  { name: "Rosa", hex: "#EC4899" },
  { name: "Rojo", hex: "#EF4444" },
  { name: "Verde", hex: "#10B981" },
]

export function DesignEditor({ product, onSave, onBack, userId }: DesignEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [textInput, setTextInput] = useState("")
  const [fontSize, setFontSize] = useState(48)
  const [fontColor, setFontColor] = useState("#000000")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [canvasColor, setCanvasColor] = useState(product.colors[0])
  const [showGrid, setShowGrid] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Draw canvas with all elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with product color
    ctx.fillStyle = canvasColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = "#E5E7EB"
      ctx.lineWidth = 0.5
      for (let i = 0; i <= canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i <= canvas.height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
    }

    // Draw elements
    elements.forEach((element) => {
      ctx.font = `${element.fontSize}px Arial`
      ctx.fillStyle = element.color
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(element.content, element.x, element.y)

      // Highlight selected element
      if (selectedElementId === element.id) {
        ctx.strokeStyle = "#8B5CF6"
        ctx.lineWidth = 2
        ctx.strokeRect(element.x - 5, element.y - 5, 100, element.fontSize + 10)
      }
    })
  }, [elements, selectedElementId, canvasColor, showGrid])

  const addTextElement = () => {
    if (!textInput.trim()) return

    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: textInput,
      x: 100,
      y: 100,
      fontSize: fontSize,
      color: fontColor,
      rotation: 0,
      opacity: 1,
    }

    setElements([...elements, newElement])
    setTextInput("")
    setSelectedElementId(newElement.id)
  }

  const addStickerElement = (sticker: string) => {
    const newElement: DesignElement = {
      id: `sticker-${Date.now()}`,
      type: "sticker",
      content: sticker,
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      fontSize: 64,
      color: "#000000",
      rotation: 0,
      opacity: 1,
    }

    setElements([...elements, newElement])
    setSelectedElementId(newElement.id)
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    setSelectedElementId(null)
  }

  const duplicateElement = (id: string) => {
    const element = elements.find((el) => el.id === id)
    if (!element) return

    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
    }

    setElements([...elements, newElement])
    setSelectedElementId(newElement.id)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert("Imagen muy grande. Máximo 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setBackgroundImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const design: Design = {
      id: `design-${Date.now()}`,
      canvasColor,
      elements,
      backgroundImage,
      createdAt: new Date(),
    }
    onSave(design)
  }

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-background to-secondary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Diseña tu {product.name}</h1>
            <p className="text-muted-foreground mt-1">Personaliza tu prenda con creatividad</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Atrás
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Tools */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="text">Texto</TabsTrigger>
                <TabsTrigger value="stickers">Stickers</TabsTrigger>
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="layers">Capas</TabsTrigger>
              </TabsList>

              {/* Text Tab */}
              <TabsContent value="text" className="space-y-4">
                <Card className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Texto</label>
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Escribe aquí..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground mt-1"
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tamaño ({fontSize}px)</label>
                    <input
                      type="range"
                      min="16"
                      max="120"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Color</label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {COLORS.map((color) => (
                        <button
                          key={color.hex}
                          className="w-10 h-10 rounded-md border-2 transition-all"
                          style={{
                            backgroundColor: color.hex,
                            borderColor: fontColor === color.hex ? "#8B5CF6" : "#E5E7EB",
                          }}
                          onClick={() => setFontColor(color.hex)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <Button onClick={addTextElement} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir Texto
                  </Button>
                </Card>
              </TabsContent>

              {/* Stickers Tab */}
              <TabsContent value="stickers" className="space-y-3">
                {Object.entries(STICKER_CATEGORIES).map(([category, stickers]) => (
                  <Card key={category} className="p-3">
                    <h4 className="text-sm font-semibold mb-2 capitalize">{category}</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {stickers.map((sticker) => (
                        <button
                          key={sticker}
                          onClick={() => addStickerElement(sticker)}
                          className="text-3xl p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          {sticker}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Color Tab */}
              <TabsContent value="color" className="space-y-4">
                <Card className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Color de Prenda</label>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-lg border-2 transition-all"
                          style={{
                            backgroundColor: color,
                            borderColor: canvasColor === color ? "#8B5CF6" : "#E5E7EB",
                          }}
                          onClick={() => setCanvasColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Imagen de Fondo</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full mt-2">
                      <Download className="w-4 h-4 mr-2" />
                      Subir Imagen
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={showGrid ? "default" : "outline"}
                      onClick={() => setShowGrid(!showGrid)}
                      className="flex-1"
                    >
                      {showGrid ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Layers Tab */}
              <TabsContent value="layers" className="space-y-2">
                {elements.length === 0 ? (
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>Añade elementos a tu diseño</AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {elements.map((element) => (
                      <Card
                        key={element.id}
                        className={`p-3 cursor-pointer transition-all ${
                          selectedElementId === element.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedElementId(element.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {element.type === "text" ? element.content : element.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {element.type} • {element.fontSize}px
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                duplicateElement(element.id)
                              }}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteElement(element.id)
                              }}
                            >
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-1">
            <Card className="p-0 overflow-hidden shadow-lg">
              <canvas ref={canvasRef} width={300} height={400} className="w-full h-auto bg-card border border-border" />
            </Card>

            {/* Element Controls */}
            {selectedElement && (
              <Card className="mt-4 p-4 space-y-3">
                <h4 className="font-semibold">Controles del Elemento</h4>

                <div>
                  <label className="text-sm font-medium">Posición X</label>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                    className="w-full px-2 py-1 border border-border rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Posición Y</label>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                    className="w-full px-2 py-1 border border-border rounded mt-1"
                  />
                </div>

                <Button variant="destructive" onClick={() => deleteElement(selectedElement.id)} className="w-full">
                  Eliminar
                </Button>
              </Card>
            )}
          </div>

          {/* Right Panel - Preview & Actions */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold">Vista Previa</h3>
              <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-5xl mb-4">👕</p>
                  <p className="text-sm text-muted-foreground">Prenda: {product.name}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Elementos:</span> {elements.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Precio base:</span> ${product.basePrice}
                </p>
              </div>

              <Button onClick={handleSave} className="w-full" size="lg">
                Guardar y Añadir al Carrito
              </Button>

              <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
                Cancelar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
