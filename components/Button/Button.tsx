import React from 'react'
import { ColorValue, Pressable, Text } from 'react-native'

interface buttonProps {
  backgroundColor: ColorValue
  label: string
  labelColor: ColorValue
  handleClick: () => void
}

function Button({
  handleClick,
  backgroundColor,
  label,
  labelColor,
}: buttonProps) {
  return (
    <Pressable
      style={{
        width: 100,
        height: 40,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      }}
      onPress={() => {
        handleClick()
      }}
    >
      <Text style={{ color: labelColor, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  )
}

export default Button
