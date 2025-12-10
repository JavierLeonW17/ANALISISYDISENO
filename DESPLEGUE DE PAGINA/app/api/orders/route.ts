import { type NextRequest, NextResponse } from "next/server"

const orders = new Map()

export async function POST(request: NextRequest) {
  try {
    const { userId, cartItems, total, paymentMethod, shippingInfo } = await request.json()

    if (!userId || !cartItems || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const order = {
      id: `order-${Date.now()}`,
      userId,
      items: cartItems,
      total,
      paymentMethod,
      shippingInfo,
      status: "pending",
      createdAt: new Date(),
    }

    orders.set(order.id, order)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userOrders = Array.from(orders.values()).filter((order: any) => order.userId === userId)

    return NextResponse.json(userOrders, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
