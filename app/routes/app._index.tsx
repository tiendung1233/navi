/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import {
  Card,
  EmptyState,
  Page
} from "@shopify/polaris";
import { useEffect } from "react";
import { AccountConnectionHandler } from "~/components/AccountTiktokConnection";
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
export interface AuthRedirectResponse {
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
  const navigation = useNavigate()
  const fetcher = useFetcher<AuthRedirectResponse>();
  const { accountTiktok } = useLoaderData<typeof loader>()
  useEffect(() => {
    if (fetcher.data?.url) {
      window.open(fetcher.data.url, "_blank");
    }
  }, [fetcher.data]);

  return (
    <Page>
      <AccountConnectionHandler accountTiktok={accountTiktok} fetcher={fetcher} />
      <Card>
        <EmptyState
          heading="Manage your inventory transfers"
          action={{
            content: 'Add tiktok feed',
            onAction: () => {
              navigation('add')
            }
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Track and receive your incoming inventory from suppliers.</p>
        </EmptyState>
      </Card>

    </Page>
  );
}