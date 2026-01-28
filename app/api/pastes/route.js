import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { content, ttl_seconds, max_views } = body;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return Response.json(
        { error: 'Invalid content' },
        { status: 400 }
      );
    }

    if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
      return Response.json(
        { error: 'Invalid ttl_seconds' },
        { status: 400 }
      );
    }

    if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
      return Response.json(
        { error: 'Invalid max_views' },
        { status: 400 }
      );
    }

    let expiresAt = null;
    if (ttl_seconds) {
      expiresAt = new Date(Date.now() + ttl_seconds * 1000);
    }

    const paste = await prisma.paste.create({
      data: {
        content,
        expiresAt,
        remainingViews: max_views ?? null,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return Response.json(
      {
        id: paste.id,
        url: `${baseUrl}/p/${paste.id}`,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
