import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import '@services/firebase';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { AuthWrapper } from '../hooks/auth';
import { StoreWrapper } from '../hooks/store';
import { breakpoints } from '../styles/breakingpoints';
import { color_coffee, color_expresso } from '../styles/colors';
import '../styles/normalize.css';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: `10px 20px`,
  small: {
    color: color_coffee,
  },
});

function CustomApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <StoreWrapper>
        <Global
          styles={css`
            html {
              /* This defines what 1rem is. */
              font-size: 16px;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Merriweather;
              color: #212121;
              background-color: #fef6ed;
              background-image: url('/background.svg');
              background-repeat: repeat;
              background-size: 500px 500px;
            }
            h1.display {
              font-size: 72px;
              font-style: italic;
              font-weight: bold;
            }
            h1 {
              font-size: 40px;
              font-style: italic;
              font-weight: bold;
            }
            h2 {
              font-size: 32px;
              font-weight: 500;
            }
            h3 {
              font-size: 28px;
            }
            h4 {
              font-size: 24px;
              font-weight: bolder;
              font-style: italic;
            }
            h5 {
              font-size: 20px;
            }
            h6 {
              font-size: 16px;
            }
            p {
              font-size: 18px;
            }
            p.lg {
              font-size: 20px;
            }
            p.sm {
              font-size: 16px;
            }

            a {
              text-decoration: underline;
              color: ${color_coffee};
              cursor: pointer;
            }

            a:hover {
              color: ${color_expresso};
            }

            ${breakpoints.md} {
              h1.display {
                font-size: 48px;
              }
            }
          `}
        />

        <Component {...pageProps} />
        <Footer>
          <small>
            Enjoy open source? We do also check it out{' '}
            <a href='https://github.com/maks112v/cafe-project' target='_blank'>
              here
            </a>
            .
          </small>
        </Footer>
      </StoreWrapper>
    </AuthWrapper>
  );
}

export default CustomApp;
