export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authId    = process.env.PLIVO_AUTH_ID
  const authToken = process.env.PLIVO_AUTH_TOKEN
  const fromNum   = process.env.PLIVO_FROM_NUMBER
  const toNum     = process.env.PARENT_PHONE

  if (!authId || !authToken || !fromNum || !toNum) {
    console.error('Missing Plivo env vars')
    return res.status(500).json({ error: 'SMS not configured' })
  }

  const { kidName, mission, summary, tip } = req.body
  const text = `🐢 Tammy says hi!\n\n${kidName} just had a Turtle Talk session.\n\n${summary}\n\n🌟 Brave Mission: ${mission}\n\n💡 Tip: ${tip}\n\n— TurtleTalk`

  const creds = Buffer.from(`${authId}:${authToken}`).toString('base64')

  try {
    const resp = await fetch(`https://api.plivo.com/v1/Account/${authId}/Message/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ src: fromNum, dst: toNum, text }),
    })
    const data = await resp.json()
    return res.status(resp.status).json(data)
  } catch (e) {
    console.error('SMS send failed:', e)
    return res.status(500).json({ error: 'Failed to send SMS' })
  }
}
