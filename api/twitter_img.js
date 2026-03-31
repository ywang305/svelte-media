// Vercel serverless function — image proxy for tweet media that fails to load
// due to CORS or mixed-content restrictions.

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'url is required' });
  }

  const imgResp = await fetch(url);
  if (!imgResp.ok) {
    return res.status(imgResp.status).end();
  }

  const contentType = imgResp.headers.get('content-type') ?? 'application/octet-stream';
  const buffer = await imgResp.arrayBuffer();

  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.send(Buffer.from(buffer));
}
