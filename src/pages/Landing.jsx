import React from 'react';
import styled from 'styled-components';
import AuthForm from '@components/AuthForm';


const Landing = () => {
  // 基于后端数据或应用状态决定表单类型、字段等
  const formProps = {
    type: 'login', // 或 'signup'
    title: 'Welcome Back!',
    fields: [
      { label: 'Email', placeholder: 'Enter your email', type: 'email' },
      {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
      },
      // 加上别的字段如'确认密码'等，如果是注册表单
    ],
    // 其他需要的props...
  };

  return (
    <div>
      <AuthForm {...formProps} />
      {/* 可以在这里添加Landing页面的其他内容，如背景图等 */}
    </div>
  );
};
// Reuse necessary styled components from previous code.

export default Landing;
