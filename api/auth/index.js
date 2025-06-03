const crypto = require('crypto');

export default function handler(req, res) {
  const { partner_id, partner_key, redirect_uri } = req.query;

  if (!partner_id || !partner_key || !redirect_uri) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const path = '/api/v2/shop/auth_partner';
  const baseString = `${partner_id}${path}${timestamp}`;

  const sign = crypto.createHmac('sha256', Buffer.from(partner_key, 'hex'))
                     .update(baseString)
                     .digest('hex');

  const authUrl = `https://partner.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(redirect_uri)}`;

  return res.redirect(authUrl);
}
