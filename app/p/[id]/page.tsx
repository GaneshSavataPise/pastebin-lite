import { notFound } from 'next/navigation';

async function getPaste(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`,
    { cache: 'no-store' }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to load paste');
  }

  return res.json();
}

export default async function PastePage(context: {
  params: Promise<{ id: string }>;
}) {
  const params = await context.params;
  const data = await getPaste(params.id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Paste</h1>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          background: '#f4f4f4',
          padding: '1rem',
        }}
      >
        {data.content}
      </pre>
    </main>
  );
}
