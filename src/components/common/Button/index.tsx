import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd';
import React from 'react';

//1. DEFINE TYPE

// Extends Antd Button's Props with our's prop 'variant'
// Use Omit to eliminate some props like (type,danger,ghost)

//2. CREATE BASE COMPONENT WRAPPER
const Button: React.FC<AntdButtonProps> = (props: AntdButtonProps) => {
  const { children, ...rest } = props;

  return <AntdButton {...rest}>{children}</AntdButton>;
};

export const PrimaryButton: React.FC<AntdButtonProps> = (props) => {
  return <Button variant="solid" color="purple" {...props} />;
};

// 4. EXPORT COMPONENT WRAPPER CƠ SỞ LÀM DEFAULT
export default Button;
