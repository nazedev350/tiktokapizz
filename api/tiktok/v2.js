const { tiktokv2 } = require('../../lib/tiktok')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') {
    return res.status(405).json({ status: false, msg: 'Method not allowed' })
  }

  const { url } = req.query
  if (!url) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter "url" wajib diisi.',
      example: '/api/tiktok/v2?url=https://www.tiktok.com/@user/video/123456'
    })
  }

  try {
    const result = await tiktokv2(url)
    return res.status(result.status ? 200 : 400).json(result)
  } catch (e) {
    return res.status(500).json({ status: false, msg: e.message })
  }
}
