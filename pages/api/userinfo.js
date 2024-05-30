// pages/api/userinfo.js
import axios from 'axios';

const apiToken = process.env.OKTA_API_TOKEN;
const domain = process.env.OKTA_DOMAIN; // 例如，https://dev-123456.okta.com

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const response = await axios.get(`https://${domain}/api/v1/users/${userId}`, {
      headers: {
        Authorization: `SSWS ${apiToken}`,
        Accept: 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Error fetching user info' });
  }
}
