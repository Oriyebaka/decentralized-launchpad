export default function handler(req, res) {
  // Access the Authorization header directly
  const authHeader = req.headers['authorization'];

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  // Main logic of the cron job
  res.status(200).end('Hello Cron!');
}
