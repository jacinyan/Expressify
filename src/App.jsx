import { Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Layout from '@components/Layout';

import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Landing from '@pages/Landing';

const GlobalStyle = createGlobalStyle`                                                              :root {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

@font-face {
  font-family: 'Cinzel';
  font-weight: 400 500 600 700 800 900;
  font-style: normal;
  src: url('/files/fonts/Cinzel/Cinzel-VariableFont_wght.ttf')
    format('truetype');
}
@font-face {
  font-family: 'Dancing Script';
  font-weight: 400 500 600 700 800 900;
  font-style: normal;
  src: url('/files/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf')
    format('truetype');
}
@font-face {
  font-family: 'Rubik';
  font-weight: 400 500 600 700 800 900;
  font-style: normal;
  src: url('/files/fonts/Rubik/Rubik-VariableFont_wght.ttf') format('truetype');
}
@font-face {
  font-family: 'Stylish';
  font-weight: 400 500 600 700 800 900;
  font-style: normal;
  src: url('/files/fonts/Stylish/Stylish-Regular.ttf') format('truetype');
}

h1 {
  margin: 0;
  font-size: clamp(26px, 2.2222222222vw, 32px);
  line-height: 1.2;
}

h2 {
  margin: 0;
  font-size: clamp(22px, 1.6666666667vw, 24px);
  line-height: 1.3;
}

h3 {
  margin: 0;
  font-size: clamp(18px, 1.3888888889vw, 20px);
  line-height: 1.4;
}

h4 {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

h5 {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

h6 {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
}

p {
  margin: 0;
}

*:focus {
  outline: 2px solid #1a87ec;
}



a {
  display: block;
  color: #1a87ec;
  -webkit-text-decoration: solid underline transparent;
  text-decoration: solid underline transparent;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
a:hover,
a:focus {
  text-decoration-color: #1a87ec;
}

img {
  max-width: 100%;
}

figure {
  margin: 0;
}

ul,
ol,
li {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

label {
  margin: 0;
  padding: 0;
}



`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="landing" element={<Landing />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
