import { getAccount } from "./accountTiktok.server";

export async function getVideoTiktok(shop: string) {
  const account = await getAccount(shop)
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${account?.accessTokenData?.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "max_count": 20 }),
  };

  try {
    const response = await fetch('https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link', options);
    if (!response.ok) {
      throw new Error(`Error fetching video list: ${response.statusText}`);
    }
    const videoListData = await response.json();
    return videoListData
  } catch (error) {
    console.error('Error fetching video list:', error);
    return null
  }
}