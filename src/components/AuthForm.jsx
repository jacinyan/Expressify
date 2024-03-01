import React from 'react';
import styled from 'styled-components';

const AuthForm = ({
  type, // 'login' 或 'signup'
  title,
  fields,
  agreeToTermsText,
  actionText,
  alternateAuthMethods,
  bottomText,
  bottomActionText,
}) => {
  return (
    <Form>
      {fields.map((field, index) => (
        <FormGroup key={index}>
          <FormLabel>{field.label}</FormLabel>
          <Input type={field.type} placeholder={field.placeholder} />
        </FormGroup>
      ))}
      {type === 'signup' && (
        <Terms>
          <Checkbox type="checkbox" />
          <TermsText>{agreeToTermsText}</TermsText>
        </Terms>
      )}
      <ActionButton>{actionText}</ActionButton>
      <Divider>Or</Divider>
      <AuthMethods>
        {alternateAuthMethods.map((method, index) => (
          <AuthMethod key={index}>
            <AuthLogo src={method.logoUrl} alt={method.altText} />
            <AuthText>{method.method}</AuthText>
          </AuthMethod>
        ))}
      </AuthMethods>
      <BottomText>
        {bottomText} <span>{bottomActionText}</span>
      </BottomText>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  margin-top: 24px;
  font: 14px Poppins, sans-serif;
  color: #000;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 9px 10px;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  background-color: #3a5b22;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 9px 60px;
  margin-top: 23px;
  font: 700 13px Poppins, sans-serif;
  cursor: pointer;
`;

const Divider = styled.div`
  margin-top: 38px;
  text-align: center;
`;

export default AuthForm;
