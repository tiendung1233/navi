import { useLoaderData } from "@remix-run/react"
import { BlockStack, Box, Button, Divider, Grid, InlineStack, LegacyCard } from "@shopify/polaris"
import { loader } from "~/routes/app._index"

interface IModalTagProduct {
  videoUrl: string
}
export default function ModalTagProduct(props: IModalTagProduct) {
  const { videoUrl } = props
  const { accountTiktok } = useLoaderData<typeof loader>()
  return (
    <ui-modal id="ui-modal" variant='large'>
      <Box padding={'500'}>
        <Grid columns={{ xs: 9, sm: 9, md: 9, lg: 9, xl: 9 }}>
          <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>

            <LegacyCard sectioned>
              <BlockStack gap="500">
                <Button>Add product</Button>
              </BlockStack>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <LegacyCard title='Preview popup' sectioned>
              <InlineStack wrap={false}>
                <iframe src={videoUrl} width="300" height="500" allow="fullscreen;"></iframe>
                <Box width="100%">
                  <img src={accountTiktok?.profile?.avatar_url} alt="" />
                  <Divider borderColor="border" />
                </Box>
              </InlineStack>

            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Box>
      <ui-title-bar title="Title">
        <button variant="primary" onClick={() => { (document.getElementById('ui-modal') as any).hide() }}>Close</button>
      </ui-title-bar>
    </ui-modal>
  )
}
