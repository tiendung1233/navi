import { ChoiceList, LegacyStack } from "@shopify/polaris";
import { useCallback } from "react";
import { useStore } from "~/libs/external-store";
import { feedSetting } from "~/util/store";

export default function FeedStatus() {
  const { status } = useStore(feedSetting, state => state)

  const handleChange = useCallback((value: string[]) => feedSetting.setState((prev) => ({
    ...prev,
    status: value
  })), []);
  return (
    <LegacyStack vertical spacing="extraTight">
      <ChoiceList
        title="Status"
        choices={[
          { label: 'Active', value: 'active' },
          { label: 'Draft', value: 'draft' },
        ]}
        selected={status}
        onChange={handleChange}
      />
    </LegacyStack>
  )

}