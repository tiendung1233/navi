import { TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function FeedName() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Name Feed"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      placeholder="Tiktok feed"
    />
  )
}