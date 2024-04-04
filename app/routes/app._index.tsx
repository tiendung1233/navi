/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  AccountConnection,
  Page
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { deleteAccount, getAccount } from "~/server/controllers/tiktok/accountTiktok.server";
import { urlApp } from "~/util/store";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionToken, session } = await authenticate.admin(request);
  const { shop } = session
  const accountTiktok = await getAccount(shop)
  urlApp.setState(() => ({
    url: `${sessionToken.iss}/apps/${sessionToken.aud}`
  }))
  return json({ accountTiktok, shop });
};
interface AuthRedirectResponse {
  url?: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const actionType = formData?.type; // Lấy loại hành động từ formData
  const { session, admin } = await authenticate.admin(request);
  const { shop } = session;

  switch (actionType) {
    case "connect":
      let url = 'https://www.tiktok.com/v2/auth/authorize/?';
      url += 'client_key=aw530k0gdl53hod8';
      url += '&scope=user.info.basic,video.list';
      url += '&response_type=code';
      url += `&redirect_uri=${process.env.REDIRECT_URL}`;
      url += '&state=' + shop;

      return new Response(JSON.stringify({ url }), {
        headers: { "Content-Type": "application/json" }
      });

    case "disconnect":
      await deleteAccount(shop);
      return new Response(JSON.stringify({ message: "Disconnected successfully" }), {
        headers: { "Content-Type": "application/json" }
      });

    default:
      return new Response(JSON.stringify({ message: "Invalid action type" }), {
        headers: { "Content-Type": "application/json" }
      });
  }
};
export default function Index() {
  const fetcher = useFetcher<AuthRedirectResponse>();
  const { accountTiktok } = useLoaderData<typeof loader>()
  useEffect(() => {
    if (fetcher.data?.url) {
      window.open(fetcher.data.url, "_blank");
    }
  }, [fetcher.data]);
  useEffect(() => {

  })
  const [connected, setConnected] = useState(accountTiktok ? true : false);
  const titleProfile = connected ? String(accountTiktok?.profile?.display_name) : 'Navi tiktok app'
  const avatarUrl = String(accountTiktok?.profile?.avatar_url)
  const handleAction = useCallback(() => {
    if (!connected) {
      fetcher.submit({ type: 'connect' }, { method: 'post' });
    } else {
      fetcher.submit({ type: 'disconnect' }, { method: 'post' });
      setConnected(false);
    }
  }, [connected, fetcher]);


  const buttonText = connected ? 'Disconnect' : 'Connect With Tiktok';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect With Tiktok</strong>, you can connect your tiktok account to our application.
    </p>
  );
  return (
    <Page>
      <AccountConnection
        connected={connected}
        title={titleProfile}
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        details={details}
        termsOfService={terms}
        avatarUrl={avatarUrl}
      />
    </Page>
  );
}