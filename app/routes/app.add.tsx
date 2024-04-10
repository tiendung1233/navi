import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Box, Grid, LegacyCard, Page } from "@shopify/polaris";
import FeedLayout from "~/components/feed/FeedLayout";
import FeedName from "~/components/feed/FeedName";
import FeedOptionSetting from "~/components/feed/FeedOption";
import FeedPreview from "~/components/feed/FeedPreview";
import FeedStatus from "~/components/feed/FeedStatus";
import FeedTitle from "~/components/feed/FeedTitle";
import { useStore } from "~/libs/external-store";
import { getVideoTiktok } from "~/server/controllers/tiktok/videoTiktok.server";
import { authenticate } from "~/shopify.server";
import { feedOptionSetting } from "~/util/store";
import indexStyles from "../routes/_index/carousel.css";

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session
  const data = await getVideoTiktok(shop)
  const videoTiktok = await data?.data?.videos
  const numberVideoTiktok = videoTiktok?.length
  return json({ numberVideoTiktok, videoTiktok });
}
export default function AddTiktokFeed() {

  const { videoTiktok, numberVideoTiktok } = useLoaderData<typeof loader>()
  const optionSetting = useStore(feedOptionSetting, (({ option }) => option))
  return (
    <Page fullWidth
      backAction={{ content: 'Products', url: '/app' }}
      title="Add feed"
      compactTitle
      primaryAction={{ content: 'Save', onAction: () => { } }}
    >
      <Box padding={'500'}>
        <Grid columns={{ xs: 9, sm: 9, md: 9, lg: 9, xl: 9 }}>
          <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>

            <LegacyCard sectioned>
              <BlockStack gap="500">
                <FeedOptionSetting />
                {optionSetting === 'general' &&
                  <>
                    <FeedName />
                    <FeedStatus />
                    <FeedTitle />
                  </>
                }
                {
                  optionSetting === 'layout' &&
                  <>
                    <FeedLayout />
                  </>
                }

              </BlockStack>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <LegacyCard title='Tiktok post' sectioned>
              <FeedPreview videoTiktok={videoTiktok} numberVideoTiktok={numberVideoTiktok} />
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Box>

    </Page>
  )
}