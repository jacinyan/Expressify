import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@components/AuthContext';
import Landing from '@pages/Landing';

import { Button, Layout, Menu, theme, Col, Row, Input } from 'antd';
import axios from 'axios';
const { Header, Content, Sider } = Layout;

const Home = () => {
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [message, setMessage] = useState('');
  const [content, setContent] = useState([{ id: 3, msg: '' }]);

  const sendMsg = async () => {
    if (message !== '') {
      content.push({
        id: 0,
        msg: message,
      });
      // setContent([...content, {
      //   id: 0,
      //   msg: message
      // }])
      setMessage('');

      try {
        await axios
          .post(
            'http://localhost:8000/psy',
            { msg: message },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res.data.msg);
            setContent([
              ...content,
              {
                id: 1,
                msg: res.data.msg,
              },
            ]);
            setMessage('');
          });
        // content.push({
        //   id: 1,
        //   msg: JSON.parse(data, null, 4).msg
        // })
      } catch (err) {}
    }
    console.log(content);
  };

  const items = [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
  ];

  const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Landing />;
  }

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/landing');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <Div>
      <Layout style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div style={{ height: '50px' }}></div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              textAlign: 'center',
              fontSize: '30px',
            }}
          >
            {' '}
            title
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 650,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {content.map((item, index) =>
                item.id === 0 ? (
                  <Row>
                    <Col span={12} offset={12}>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            margin: '0.5em 0 0.1em 15px',
                            padding: '15px 10px',
                            minWidth: '120px',
                            maxWidth: '100%',
                            color: '#555',
                            fontSize: '16px',
                            background: '#e0f2ff',
                            borderRadius: '15px',
                          }}
                        >
                          {item.msg}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : item.id === 1 ? (
                  <Row>
                    <Col span={12}>
                      <div style={{ textAlign: 'left' }}>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            margin: '0.5em 0 0.1em 15px',
                            padding: '15px 10px',
                            minWidth: '120px',
                            maxWidth: '100%',
                            color: '#555',
                            fontSize: '16px',
                            background: '#DCDCDC',
                            borderRadius: '15px',
                          }}
                        >
                          {item.msg}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ''
                )
              )}
            </div>
          </Content>
          <div
            style={{
              padding: 12,
              width: '1520px',
              alignItems: 'center',
            }}
          >
            <Row style={{ height: '50px' }}>
              <Col span={18}>
                <Input
                  placeholder=" te input and button"
                  style={{ width: '100%' }}
                  value={message}
                  onInput={(e) => {
                    setMessage(e.target.value);
                  }}
                />{' '}
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={sendMsg}>
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </Layout>
      </Layout>
    </Div>
  );
};

export default Home;

const Div = styled.div`
  background-color: #f8f8ff;
  padding: 0px;
  height: 100vh;
  overflow: hidden;
`;
