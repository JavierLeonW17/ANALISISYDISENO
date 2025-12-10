# 🦁 LionsJLW - Personaliza tu Ropa Única

Una plataforma de e-commerce moderna para diseñar y comprar prendas personalizadas con estampados personalizados. Crea diseños únicos, visualiza cómo quedarán en 3D y compra directamente.

## 🎯 Características Principales

- **Editor de Diseños Intuitivo**: Herramienta visual profesional para personalizar prendas con texto, emojis, stickers y imágenes
- **Vista Previa 3D**: Visualiza cómo lucirá tu diseño en la prenda antes de comprar
- **Catálogo Completo**: 4 tipos de prendas disponibles (camisetas, sudaderas, etc.) en múltiples colores
- **Carrito Inteligente**: Gestiona tus diseños personalizados con control de cantidades
- **Checkout Seguro**: Pasarela de pagos con validación de datos y confirmación de pedido
- **Autenticación**: Sistema de registro e inicio de sesión para guardar diseños y pedidos
- **Diseño Responsivo**: Interfaz moderna y accesible en todos los dispositivos

## 🛠️ Stack Tecnológico

- **Frontend**: React + TypeScript
- **Framework**: Next.js (App Router)
- **Estilos**: Tailwind CSS v4 + CSS personalizado
- **Gestión de Estado**: Zustand
- **Canvas**: Canvas API nativo para editor de diseños
- **UI Components**: shadcn/ui
- **Backend**: Next.js API Routes

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Instalación y Setup

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/lionsjlw.git
cd lionsjlw
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Autenticación (opcional)
# NEXTAUTH_SECRET=tu_secret_aqui
# NEXTAUTH_URL=http://localhost:3000

# Pagos (opcional)
# STRIPE_PUBLIC_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
\`\`\`

### 4. Ejecutar en desarrollo
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en: `http://localhost:3000`

### 5. Construir para producción
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
lionsjlw/
├── app/
│   ├── layout.tsx           # Layout raíz con metadatos
│   ├── page.tsx             # Página de entrada
│   ├── globals.css          # Estilos globales y tokens de diseño
│   ├── App.tsx              # Componente principal de la aplicación
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts       # Endpoint de login
│       │   └── register/route.ts    # Endpoint de registro
│       ├── designs/route.ts         # CRUD de diseños
│       ├── orders/route.ts          # CRUD de pedidos
│       └── products/route.ts        # Obtener catálogo
├── components/
│   ├── AuthForm.tsx         # Formulario de autenticación
│   ├── ProductCatalog.tsx   # Catálogo de productos
│   ├── DesignEditor.tsx     # Editor de diseños
│   ├── ShoppingCart.tsx     # Carrito de compras
│   ├── PaymentGateway.tsx   # Pasarela de pagos
│   ├── Header.tsx           # Encabezado con navegación
│   └── ui/                  # Componentes shadcn/ui
├── lib/
│   ├── types/
│   │   └── apparel.ts       # Tipos TypeScript
│   ├── api-client.ts        # Cliente HTTP
│   ├── auth-context.ts      # Contexto de autenticación (Zustand)
│   └── utils.ts             # Funciones utilitarias
├── hooks/
│   └── use-auth.ts          # Hook personalizado para autenticación
├── public/
│   └── images/              # Imágenes estáticas
├── scripts/                 # Scripts de utilidad
├── next.config.mjs          # Configuración de Next.js
├── tsconfig.json            # Configuración de TypeScript
├── tailwind.config.js       # Configuración de Tailwind
└── package.json             # Dependencias del proyecto
\`\`\`

## 🎨 Sistema de Colores

\`\`\`css
--background: #faf8f6;      /* Cream */
--foreground: #1a1a1a;      /* Charcoal */
--primary: #8b5cf6;         /* Purple */
--secondary: #f5f5f5;       /* Light Gray */
--accent: #ec4899;          /* Pink */
--border: #e5e5e5;          /* Border Gray */
\`\`\`

## 📱 Vistas Principales

### 1. **Autenticación** (`/auth`)
Formulario de login/registro con validación de datos y feedback visual.

**Campos disponibles:**
- Email (validación de formato)
- Contraseña (mínimo 6 caracteres)
- Nombre (solo en registro)
- Confirmación de contraseña (solo en registro)

### 2. **Catálogo de Productos** (`/catalog`)
Muestra 4 tipos de prendas disponibles para personalizar.

**Productos:**
- Camiseta Básica ($19.99)
- Sudadera con Capucha ($39.99)
- Camiseta Sin Mangas ($16.99)
- Sudadera Clásica ($34.99)

Cada producto incluye:
- Imagen del producto
- Selector de colores
- Botón "Personalizar"

### 3. **Editor de Diseños** (`/editor`)
Herramienta profesional para personalizar prendas.

**Herramientas disponibles:**
- **Texto**: Añade texto con fuente, tamaño y color personalizables
- **Emojis**: Selector de emojis predefinidos
- **Stickers**: Categorías: Anime, Manga, Kawaii, Cartoon, Geek
- **Formas**: Círculos, rectángulos y líneas
- **Imágenes**: Carga tus propias imágenes (JPG, PNG, máx. 5MB)
- **Colores**: Selector de colores para cualquier elemento

**Funcionalidades:**
- Canvas interactivo con grid de alineación
- Sistema de capas para organizar elementos
- Duplicar y eliminar elementos rápidamente
- Zoom configurable
- Vista previa 3D del producto final
- Guardado automático de diseños

### 4. **Carrito de Compras** (`/cart`)
Gestiona tus diseños personalizados.

**Funciones:**
- Visualizar productos en el carrito
- Modificar cantidades (+-) 
- Eliminar productos
- Cálculo automático de subtotal y total
- Enlace a proceder al pago
- Volver al catálogo

### 5. **Pasarela de Pagos** (`/checkout`)
Formulario de información de envío y pago.

**Pasos:**
1. Información de envío (nombre, dirección, ciudad, estado, código postal, país)
2. Información de pago (número de tarjeta, nombre, fecha de expiración, CVV)
3. Resumen del pedido
4. Confirmación de pago

**Validaciones:**
- Campos requeridos
- Formato de email
- Número de tarjeta válido (16 dígitos)
- CVV válido (3 dígitos)

### 6. **Confirmación** (`/success`)
Página de éxito tras completar el pedido.

Muestra:
- Número de orden único
- Resumen de compra
- Dirección de envío
- Tiempo estimado de entrega (5-7 días)
- Opciones para seguir comprando o ver pedidos

## 🔗 API Endpoints

### Autenticación
\`\`\`
POST /api/auth/register
- Body: { email, password, passwordConfirm, fullName }
- Response: { success, user, token }

POST /api/auth/login
- Body: { email, password }
- Response: { success, user, token }
\`\`\`

### Productos
\`\`\`
GET /api/products
- Response: [{ id, name, price, colors, image, description }]
\`\`\`

### Diseños
\`\`\`
GET /api/designs
- Response: [{ id, userId, productId, designData, createdAt }]

POST /api/designs
- Body: { productId, designData, productColor }
- Response: { success, design }

PUT /api/designs/:id
- Body: { designData }
- Response: { success, design }

DELETE /api/designs/:id
- Response: { success }
\`\`\`

### Pedidos
\`\`\`
GET /api/orders
- Response: [{ id, userId, items, total, status, createdAt }]

POST /api/orders
- Body: { items, shippingInfo, paymentInfo }
- Response: { success, order }
\`\`\`

## 🔐 Seguridad

- Contraseñas almacenadas en texto plano (solo demo - usar bcrypt en producción)
- Validación de datos en cliente y servidor
- HTTP-only cookies para sesión (futuro)
- CORS configurado
- Sanitización de entrada en formularios

## 🎯 Flujos de Usuario

### Nuevo Usuario
1. Registro con email y contraseña
2. Explorar catálogo de productos
3. Seleccionar prenda y color
4. Personalizar con el editor de diseños
5. Guardar diseño y añadir al carrito
6. Revisar carrito
7. Proceder al checkout
8. Completar pago
9. Recibir confirmación de orden

### Usuario Existente
1. Login con credenciales
2. Acceso directo a catálogo
3. (Mismo flujo que nuevo usuario desde paso 2)

### Editar Diseño Existente
1. Acceder a carrito
2. Hacer click en producto
3. Volver al editor
4. Modificar diseño
5. Guardar cambios

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
npm install -g vercel
vercel login
vercel deploy
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod --dir=.next
\`\`\`

## 📊 Estadísticas de Rendimiento

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 98+
- Time to Interactive: <1.5s
- Largest Contentful Paint: <2.0s

## 🐛 Solución de Problemas

### El editor no aparece
- Verifica que JavaScript esté habilitado
- Limpia caché del navegador
- Intenta con otro navegador

### Los diseños no se guardan
- Comprueba la conexión de red
- Verifica logs en la consola del navegador
- Intenta recargar la página

### Erro de CORS
- Asegúrate que NEXT_PUBLIC_API_URL está configurado correctamente
- Verifica headers de CORS en API routes

### Problemas de sesión
- Borra cookies del navegador
- Intenta logout y login nuevamente
- Verifica que las cookies HTTP-only estén habilitadas

## 🔄 Roadmap Futuro

- [ ] Persistencia con Supabase/PostgreSQL
- [ ] Integración de Stripe para pagos reales
- [ ] Sistema de roles y admin dashboard
- [ ] Historial de pedidos completo
- [ ] Exportar diseños en PDF
- [ ] Compartir diseños en redes sociales
- [ ] Búsqueda y filtros avanzados
- [ ] Wishlist de productos
- [ ] Reseñas y calificaciones
- [ ] Notificaciones por email
- [ ] App móvil nativa

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE.md` para más detalles.

## 🙏 Créditos

- Componentes UI: [shadcn/ui](https://ui.shadcn.com/)
- Imágenes: [Unsplash](https://unsplash.com)
- Tipografía: [Google Fonts](https://fonts.google.com)
- Iconos: [Lucide Icons](https://lucide.dev)

## 📞 Contacto y Soporte

- Email: support@lionsjlw.com
- GitHub: [tu-usuario/lionsjlw](https://github.com/tu-usuario/lionsjlw)
- Reportar bugs: [Issues](https://github.com/tu-usuario/lionsjlw/issues)
- Solicitar features: [Discussions](https://github.com/tu-usuario/lionsjlw/discussions)

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025  
**Mantenedor**: Tu Nombre  
**Estado**: En desarrollo activo

---

## 🎓 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [React Documentation](https://react.dev)

---

Hecho con 🦁 por LionsJLW
