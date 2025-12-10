import { type NextRequest, NextResponse } from "next/server"

const designs = new Map()

export async function POST(request: NextRequest) {
  try {
    const { userId, productId, design } = await request.json()

    if (!userId || !productId || !design) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const savedDesign = {
      id: `design-${Date.now()}`,
      userId,
      productId,
      design,
      createdAt: new Date(),
    }

    designs.set(savedDesign.id, savedDesign)

    return NextResponse.json(savedDesign, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save design" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userDesigns = Array.from(designs.values()).filter((d: any) => d.userId === userId)

    return NextResponse.json(userDesigns, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch designs" }, { status: 500 })
  }
}
