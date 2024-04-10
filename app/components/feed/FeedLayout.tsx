import { Select } from "@shopify/polaris";
import { useCallback } from "react";
import { useStore } from "~/libs/external-store";
import { feedSetting } from "~/util/store";
import SliderInput from "../SliderInput";

export default function FeedLayout() {
  const { layout, spacing, item_in_column } = useStore(feedSetting, state => state)
  const handleSelectChange = useCallback(
    (value: string) => {
      feedSetting.setState((prev) => ({
        ...prev,
        layout: value,

      }))
    },
    [],
  );

  const options = [
    { label: 'Grid', value: 'grid' },
    { label: 'Slideshow', value: 'slideshow' },
  ];
  const handleItemsPerRow = (newValue: any, id: any) => {
    feedSetting.setState((prev) => ({
      ...prev,
      item_in_column: newValue,

    }))
  }
  const handleSpacingItemPerRow = (newValue: any, id: any) => {
    feedSetting.setState((prev) => ({
      ...prev,
      spacing: newValue,
    }))
  }

  return (
    <>
      <Select
        label="Feed Layout"
        options={options}
        onChange={handleSelectChange}
        value={layout}
      />
      {layout === 'grid' &&
        <>
          <SliderInput
            label="Number of items per row"
            id="itemsPerRow"
            defaultValue={0}
            min={1}
            max={10}
            value={item_in_column}
            suffix='item'
            handleOnChange={handleItemsPerRow}
          />
          <SliderInput
            label="Distance between items"
            id="distanceBetweenItems"
            defaultValue={0}
            min={0}
            max={40}
            suffix='px'
            value={spacing}
            handleOnChange={handleSpacingItemPerRow}
          />
        </>
      }
    </>
  )
}