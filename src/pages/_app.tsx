import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Template } from '@@components';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import client from '../../apollo-client';

import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <Template >
          <Component {...pageProps} />
        </Template>
      </SessionProvider>
    </ApolloProvider>
  )
}
