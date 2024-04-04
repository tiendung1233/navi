import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { urlApp } from "~/util/store";
import { fetchTikTokAccessToken } from "~/util/tiktok/fetch-tikTok-access-token";
import { accountTiktok } from "~/server/controllers/tiktok/accountTiktok.server";
import { getProfileTiktok } from "~/util/tiktok/profile-tiktok";
export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin } = await authenticate.webhook(
    request
  );

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  // Lấy giá trị của query parameter 'code'
  const code = url.searchParams.get("code");
  const shopDomain = String(url.searchParams.get("state"))

  const accessTokenData = await fetchTikTokAccessToken(String(code));
  const { access_token } = accessTokenData
  const profile = await getProfileTiktok(access_token)
  // const { access_token, expires_in, open_id, refresh_expires_in, refresh_token, token_type } = accessTokenData
  // accountTiktok.setState(() => ({
  //   accessToken: access_token,
  //   expiresIn: expires_in,
  //   openId: open_id,
  //   refreshExpiresIn: refresh_expires_in,
  //   refreshToken: refresh_token,
  //   tokenType: token_type
  // }))
  await accountTiktok(access_token, shopDomain, profile?.userinfoData?.data?.user)

  const data = urlApp.getState()
  return redirect(data.url);
};