// import React from 'react';
import { Typography } from 'antd';

const LoginPage = () => {
  const { Title } = Typography;
  return (
    <div className="w-full flex justify-between bg-purple-950  3xl:bg-red-50">
      <Title
        className="transition-all duration-500 ease-fluid text-3xl text-white!"
        style={{ color: 'red' }}
      >
        BAO Insurance
      </Title>
    </div>
  );
};

export default LoginPage;
