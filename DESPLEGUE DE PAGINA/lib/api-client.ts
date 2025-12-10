export async function loginUser(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

export async function registerUser(email: string, password: string, name: string) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}

export async function saveDesign(userId: string, productId: string, design: any) {
  const response = await fetch("/api/designs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, design }),
  })

  if (!response.ok) {
    throw new Error("Failed to save design")
  }

  return response.json()
}

export async function getUserDesigns() {
  const response = await fetch("/api/designs")

  if (!response.ok) {
    throw new Error("Failed to fetch designs")
  }

  return response.json()
}

export async function createOrder(
  userId: string,
  cartItems: any[],
  total: number,
  paymentMethod: string,
  shippingInfo: any,
) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, cartItems, total, paymentMethod, shippingInfo }),
  })

  if (!response.ok) {
    throw new Error("Failed to create order")
  }

  return response.json()
}

export async function getUserOrders() {
  const response = await fetch("/api/orders")

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }

  return response.json()
}
