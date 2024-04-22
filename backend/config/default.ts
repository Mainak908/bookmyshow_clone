export default {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl: `${process.env.CORSORIGIN}/auth/callback`,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.TOKEN_SECRET,
  privateKey: process.env.TOKEN_SECRET,
};
