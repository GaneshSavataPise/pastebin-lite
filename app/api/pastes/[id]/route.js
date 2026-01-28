import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
  try {
    const params = await context.params;
    const id = params.id;

    const paste = await prisma.paste.findUnique({
      where: { id },
    });

    if (!paste) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isTestMode = process.env.TEST_MODE === '1';
    const now =
      isTestMode && req.headers.get('x-test-now-ms')
        ? new Date(Number(req.headers.get('x-test-now-ms')))
        : new Date();

    if (paste.expiresAt && now > paste.expiresAt) {
      await prisma.paste.delete({ where: { id } });
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (paste.remainingViews !== null) {
      if (paste.remainingViews <= 0) {
        await prisma.paste.delete({ where: { id } });
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      await prisma.paste.update({
        where: { id },
        data: { remainingViews: paste.remainingViews - 1 },
      });
    }

    return Response.json(
      {
        content: paste.content,
        remaining_views:
          paste.remainingViews !== null
            ? paste.remainingViews - 1
            : null,
        expires_at: paste.expiresAt,
      },
      { status: 200 }
    );
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
