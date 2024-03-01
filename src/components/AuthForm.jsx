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
      <Title>{title}</Title>
      {fields.map((field, index) => (
        <Field key={index}>
          <Label>{field.label}</Label>
          <Input type={field.type} placeholder={field.placeholder} />
        </Field>
      ))}
      {type === 'signup' && (
        <Terms>
          <Checkbox type="checkbox" />
          <TermsText>{agreeToTermsText}</TermsText>
        </Terms>
      )}
      <ActionButton>{actionText}</ActionButton>
      <Or>Or</Or>
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

const Div = styled.div`
  background-color: #fff;
  padding-left: 80px;
  @media (max-width: 991px) {
    padding-left: 20px;
  }
`;

const Div2 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 38%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-weight: 500;
  margin: auto 0;
  padding: 2px 0;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div4 = styled.div`
  color: #000;
  font: 32px Poppins, sans-serif;
`;

const Div5 = styled.div`
  color: #000;
  margin-top: 11px;
  font: 16px Poppins, sans-serif;
`;

const InputLabel = styled.div`
  color: #000;
  margin-top: 16px;
  font: 14px Poppins, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  margin-top: 8px;
  font: 14px Poppins, sans-serif;
`;

const ButtonLink = styled.button`
  background: none;
  border: none;
  color: var(--action-sec, #0c2a92);
  font: 10px Poppins, sans-serif;
  cursor: pointer;
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 10px;
  background-color: #3a5b22;
  margin-top: 20px;
  padding: 10px 0;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

const Div16 = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

const Div24 = styled.div`
  color: rgba(15, 61, 222, 1);
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
  font: 16px Poppins, sans-serif;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 62%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Img3 = styled.img`
  width: 100%;
  height: auto;
`;

export default AuthForm;
