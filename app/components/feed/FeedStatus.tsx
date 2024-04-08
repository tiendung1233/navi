import { ChoiceList, LegacyStack } from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function FeedStatus() {
  const [selected, setSelected] = useState<string[]>(['active']);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);
  return (
    <LegacyStack vertical spacing="extraTight">
      <ChoiceList
        title="Status"
        choices={[
          { label: 'Active', value: 'active' },
          { label: 'Draft', value: 'draft' },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    </LegacyStack>
  )

}