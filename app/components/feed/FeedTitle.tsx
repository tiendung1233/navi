import { TextField } from "@shopify/polaris";
import { useCallback } from "react";
import { useStore } from "~/libs/external-store";
import { feedSetting } from "~/util/store";

export default function FeedTitle() {
  const { title } = useStore(feedSetting, state => state)
  const handleChange = useCallback(
    (newValue: string) => {
      feedSetting.setState((prev => ({
        ...prev,
        title: newValue
      })))
    },
    [],
  );

  return (
    <TextField
      label="Feed Title"
      value={title}
      onChange={handleChange}
      autoComplete="off"
      placeholder="Title post"
    />
  )
}