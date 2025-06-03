const crypto = require('crypto');

export default function handler(req, res) {
  const { partner_id, path, timestamp } = req.query;

  if (!partner_id || !path || !timestamp) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Agora usamos Buffer direto na criação
  const partner_key = Buffer.from('4f415055726e715a63554872747673427a5373646244726e5841694874587666', 'hex');

  try {
    const baseString = `${partner_id}${path}${timestamp}`;

    const sign = crypto
      .createHmac('sha256', partner_key)
      .update(baseString)
      .digest('hex');

    return res.status(200).json({ sign });
  } catch (err) {
    return res.status(500).json({
      error: 'sign generation failed',
      message: err.message,
    });
  }
}
