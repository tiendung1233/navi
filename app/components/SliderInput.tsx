import { Box, InlineStack, RangeSlider, Text, TextField } from '@shopify/polaris'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { clampAndValidateStringValue } from '~/util'

const SLIDER_INPUT_DEBOUNCE_TIME = 100

type TSliderInputProps = {
  id: string
  label: string
  defaultValue: number
  min: number
  max: number
  value: number
  suffix: string
  handleOnChange?: any
}

const SliderInput = (props: TSliderInputProps) => {
  const { id, label, defaultValue, min, max, value: initValue, suffix, handleOnChange } = props

  const [value, setValue] = useState(defaultValue || 0)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const debouncedHandleChange = useMemo(() => {
    return debounce(handleOnChange, SLIDER_INPUT_DEBOUNCE_TIME)
  }, [handleOnChange])

  function handleChangeValue(newValue: any, id: any) {
    newValue = parseInt(newValue)
    setValue(newValue)
    debouncedHandleChange(newValue, id)
  }

  return (
    <Box >
      <Text as="p" variant="bodyMd">
        {label}
      </Text>
      <InlineStack wrap={false} gap={'200'} blockAlign='center'>
        <Box width="60%">
          <RangeSlider
            id={id}
            label=""
            labelHidden
            min={min}
            max={max}
            value={value || defaultValue}
            onChange={handleChangeValue}
          />
        </Box>
        <Box width="35%">
          <TextField
            id={id}
            label=""
            autoComplete="off"
            suffix={suffix}
            value={value.toString() || defaultValue.toString()}
            onChange={handleChangeValue}
            type="number"
            min={min}
            max={max}
            onBlur={() => {
              const _value = clampAndValidateStringValue(value.toString(), min, max)
              handleChangeValue(_value, id)
            }}
          />
        </Box>
      </InlineStack>

    </Box>
  )
}

export default SliderInput
