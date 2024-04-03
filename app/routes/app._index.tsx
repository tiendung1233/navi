/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {

  Page
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { Form, redirect, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { urlApp } from "~/util/store";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionToken } = await authenticate.admin(request);
  urlApp.setState(() => ({
    url: `${sessionToken.iss}/apps/${sessionToken.aud}`
  }))
  console.log('url-------}', `${sessionToken.iss}/apps/${sessionToken.aud}`);
  return null;
};
interface AuthRedirectResponse {
  url?: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('submit');
  const csrfState = Math.random().toString(36).substring(2);

  let url = 'https://www.tiktok.com/v2/auth/authorize/?';
  url += 'client_key=aw530k0gdl53hod8';
  url += '&scope=user.info.basic';
  url += '&response_type=code';
  url += '&redirect_uri=https://rc.navi.io.vn/social/tiktok/oauth';
  url += '&state=' + csrfState;
  console.log('url', url);

  // Instead of redirecting, return the URL in the response body.
  return new Response(JSON.stringify({ url }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export default function Index() {
  const fetcher = useFetcher<AuthRedirectResponse>();

  useEffect(() => {
    if (fetcher.data?.url) {
      window.open(fetcher.data.url, "_blank");
    }
  }, [fetcher.data]);

  return (
    <Page>
      <fetcher.Form method="post">
        <button type="submit">login</button>
      </fetcher.Form>
    </Page>
  );
}