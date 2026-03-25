const https = require('https');
const crypto = require('crypto');

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

async function sendCapiEvent(eventName, eventData) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing Meta Pixel ID or CAPI Access Token in environment variables.');
    return;
  }

  const payload = {
    data: [eventData],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  const options = {
    hostname: 'graph.facebook.com',
    path: `/v19.0/${PIXEL_ID}/events`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error sending CAPI event:', error);
      reject(error);
    });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

function createUserData(req, rawData) {
    const userData = {
        client_ip_address: req.ip,
        client_user_agent: req.headers['user-agent'],
        fbp: req.cookies._fbp || undefined,
        fbc: req.cookies._fbc || undefined,
    };

    if (rawData.email) userData.em = crypto.createHash('sha256').update(rawData.email).digest('hex');
    if (rawData.phone) userData.ph = crypto.createHash('sha256').update(rawData.phone).digest('hex');
    if (rawData.firstName) userData.fn = crypto.createHash('sha256').update(rawData.firstName).digest('hex');
    if (rawData.lastName) userData.ln = crypto.createHash('sha256').update(rawData.lastName).digest('hex');

    return userData;
}

module.exports = { sendCapiEvent, createUserData };
