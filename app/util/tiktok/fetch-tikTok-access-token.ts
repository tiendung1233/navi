export async function fetchTikTokAccessToken(code: string) {
  const clientKey = String(process.env.CLIENT_KEY)
  const clientSecret = String(process.env.CLIENT_SECRET)
  const redirectUri = String(process.env.REDIRECT_URL)
  const url = 'https://open.tiktokapis.com/v2/oauth/token/';
  const data = {
    client_key: clientKey,
    client_secret: clientSecret,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body: new URLSearchParams(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching access token: ${response.statusText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error; // Re-throw for potential handling in calling code
  }
}
