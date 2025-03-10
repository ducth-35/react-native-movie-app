import React from 'react';
import {Text} from 'react-native';
import {TextProperties} from './type';
import {textPresets} from './preset';

const TextApp = ({
  style: styleOverride = {},
  children,
  preset = 'default',
  onPress,
  ...props
}: TextProperties) => {
  let newStyle;
  if (Array.isArray(styleOverride)) {
    newStyle = [textPresets[preset], ...styleOverride];
  } else {
    newStyle = [textPresets[preset], styleOverride];
  }

  return (
    <Text
      {...props}
      style={newStyle}
      onPress={onPress}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default TextApp;
