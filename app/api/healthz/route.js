import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return Response.json({ ok: true }, { status: 200 })
  } catch (e) {
    console.error(e)
    return Response.json({ ok: false }, { status: 200 })
  }
}
