import styled from '@emotion/styled';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { color_coffee } from '../styles/colors';

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: `10px 20px`,
  small: {
    color: color_coffee,
  },
});

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Footer>
          <small>
            Enjoy open source? We do also check it out{' '}
            <a href='https://github.com/maks112v/cafe-project' target='_blank'>
              here
            </a>
            .
          </small>
        </Footer>
      </Html>
    );
  }
}

export default CustomDocument;
