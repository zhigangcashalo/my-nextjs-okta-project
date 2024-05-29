// pages/_app.tsx
import { AppProps } from 'next/app';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useRouter } from 'next/router';
import config from '../config/okta.config';
import '../styles/globals.css';

const oktaAuth = new OktaAuth(config);

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string | undefined) => {
    if (originalUri) {
      const baseUrl = window.location.origin;
      router.push(originalUri.replace(baseUrl, '') || '/');
    } else {
      router.push('/');
    }
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Component {...pageProps} />
    </Security>
  );
};

export default CustomApp;
