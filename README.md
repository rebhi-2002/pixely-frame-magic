# Screenshot Perfect

Implement exactly the screenshot and nothing else

## Development

You need Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deployment

This project targets TanStack Start with Nitro. Set the `NITRO_PRESET`
environment variable on your hosting platform:

- Vercel: `NITRO_PRESET=vercel`
- Netlify: `NITRO_PRESET=netlify`

Also set `VITE_API_BASE_URL` to your backend's public URL in the
platform's environment variables (never commit real secrets to `.env`).
