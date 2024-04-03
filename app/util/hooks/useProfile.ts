import { accountTiktok } from "../store";

export const useProfile = async () => {
  const fields = 'open_id,union_id,avatar_url,display_name';
  const { accessToken } = accountTiktok.getState()
  console.log('data', accessToken);
  const options = {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${accessToken}`,s
    },
  };

  try {
    const response = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=${fields}`, options);
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }
    const userinfoData = await response.json();
    return {
      userinfoData
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}