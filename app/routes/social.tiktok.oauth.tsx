import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { accountTiktok, urlApp } from "~/util/store";
import { fetchTikTokAccessToken } from "~/util/tiktok/fetch-tikTok-access-token";
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

  // Log giá trị của 'code'
  const accessTokenData = await fetchTikTokAccessToken(String(code));
  const { access_token, expires_in, open_id, refresh_expires_in, refresh_token, token_type } = accessTokenData
  accountTiktok.setState(() => ({
    accessToken: access_token,
    expiresIn: expires_in,
    openId: open_id,
    refreshExpiresIn: refresh_expires_in,
    refreshToken: refresh_token,
    tokenType: token_type
  }))
  const data = urlApp.getState()
  return redirect(data.url);
};