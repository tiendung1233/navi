import { Button, ButtonGroup } from "@shopify/polaris";
import { useCallback } from "react";
import { useStore } from "~/libs/external-store";
import { feedOptionSetting } from "~/util/store";

export default function FeedOptionSetting() {
  const optionSetting = useStore(feedOptionSetting, (({ option }) => option))
  const handleButtonClick = useCallback(
    (index: string,) => {
      console.log(optionSetting, index);
      feedOptionSetting.setState(() => ({
        option: index
      }))
    },
    [optionSetting],
  );
  return (
    <ButtonGroup variant="segmented">
      <Button
        pressed={optionSetting === 'general'}
        onClick={() => handleButtonClick('general')}
      >
        General
      </Button>
      <Button
        pressed={optionSetting === 'style'}
        onClick={() => handleButtonClick('style')}
      >
        Style
      </Button>
      <Button
        pressed={optionSetting === 'layout'}
        onClick={() => handleButtonClick('layout')}
      >
        Layout
      </Button>
    </ButtonGroup>
  )
}