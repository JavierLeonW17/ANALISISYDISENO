import { type NextRequest, NextResponse } from "next/server"

const users = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (users.has(email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const user = {
      id: `user-${Date.now()}`,
      email,
      name,
      password,
      createdAt: new Date(),
    }

    users.set(email, user)

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
      },
      { status: 201 },
    )

    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
