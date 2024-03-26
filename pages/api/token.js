import { saveToken } from "../../src/tokenStorage";

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { token } = req.body;
      saveToken(token.value);
      res.status(200).send(`Token saved: ${token.value}`);
    } else {
      res.setHeader('Allow', ['POST']);
    
      res.status(405).end('Method Not Allowed');
    }
  }