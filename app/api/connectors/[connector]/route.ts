import connectors from '@/lib/connectors/all';

export async function GET(
  request: Request,
  { params: { connector: connectorName } }: { params: { connector: string } },
) {
  const connector = connectors[connectorName];

  if (!connector) {
    return Response.json({ error: 'Connector not found' }, { status: 404 });
  }

  const mangas = await connector.getMangas();

  return Response.json({ mangas });
}
