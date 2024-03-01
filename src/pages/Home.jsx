import { useState } from 'react';
import styled from 'styled-components';

const Image = styled.img``;

const SearchBar = ({ src, placeholder, onSearch }) => (
  <DivFlexColumn>
    <Button onClick={onSearch}>
      <Image loading="lazy" src={src} />
    </Button>
    <SearchPlaceholder>{placeholder}</SearchPlaceholder>
  </DivFlexColumn>
);

const Message = ({ imgSrc, text, onClick }) => (
  <>
    <DivMessage>
      <Button onClick={onClick}>
        <Image loading="lazy" src={imgSrc} />
      </Button>
      <DivMessageText>{text}</DivMessageText>
    </DivMessage>
  </>
);

const ChatInput = ({ placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <DivChatInput>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={inputValue}
      />
      <Button onClick={() => onSubmit(inputValue)}>Send</Button>
    </DivChatInput>
  );
};

function Home() {
  const handleSearch = () => {
    console.log('Search triggered');
  };

  const handleMessageClick = () => {
    console.log('Message clicked');
  };

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
  };

  return (
    <Div>
      <Div2>
        <Column>
          <Div3>
            <Image
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aced0a07c08bcd3b81c2c5fa0d7e0d47a7acd30ec7daa74e6ecf33d574e12879?apiKey=5b4baf33c4d54498a95a7ba99d40bd80&"
            />
          </Div3>
        </Column>
        <Column2>
          <Div4>
            <Div5>
              <SearchBar
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/29b22b79e0d5e1e794d7418920732cda4e43f64140644ec25de63f6d7c6dd05c?apiKey=5b4baf33c4d54498a95a7ba99d40bd80&"
                placeholder="Search"
                onSearch={handleSearch}
              />
              <Message
                imgsrc="https://cdn.builder.io/api/v1/image/assets/TEMP/59e96b8573c0cabc33f39b999f8204a51b2bd238810e55894012173889020f24?apiKey=5b4baf33c4d54498a95a7ba99d40bd80&"
                text="Rephrase ‘This is an AI chatbot generated for better communication and simpler work flows’"
                onClick={handleMessageClick}
              />
              <Message
                imgsrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0cd7cba57facdf5539d525a6bb0d84d9cd67820fc8f255c9798a580d3dc85a3b?apiKey=5b4baf33c4d54498a95a7ba99d40bd80&"
                text="Thank You :)"
                onClick={handleMessageClick}
              />
              <ChatInput
                placeholder="Type a new message here"
                onSubmit={handleSendMessage}
              />
            </Div5>
          </Div4>
        </Column2>
      </Div2>
    </Div>
  );
}

export default Home

const Div = styled.div`
  background-color: #f8f8ff;
  padding: 24px 34px 50px;
  @media (max-width: 991px) {
    padding: 0 20px;
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
  width: 15%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div3 = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 3px solid #f8f8ff;
  box-shadow: 0px 4px 6px 0px rgba(15, 11, 11, 0.1);
  background-color: #02040f;
  display: flex;
  width: 100%;
  padding: 2px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 85%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div4 = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div5 = styled.div`
  align-self: end;
  display: flex;
  width: 718px;
  max-width: 100%;
  flex-direction: column;
  font-weight: 400;
`;

const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SearchPlaceholder = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 16px;
`;

const DivMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DivMessageText = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px;
`;

const DivChatInput = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
