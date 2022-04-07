// ** Next Imports
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';

// ** Loader Import
import NProgress from 'nprogress';

// ** Emotion Imports

// ** Config Imports
import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/@core/context/settingsContext';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import themeConfig from 'src/configs/themeConfig';

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout';

// ** Contexts

// ** Utils Imports

import { ApiProvider } from '../services';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** Global css styles
import '../../styles/globals.css';

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <ApiProvider>
        <Head>
          <title>{`${themeConfig.templateName} - Administrator Page`}</title>
          <meta
            name="description"
            content={`${themeConfig.templateName} – Administrator Page`}
          />
          <meta
            name="keywords"
            content="Material Design, MUI, Rent, House, Find house, find place to stay"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  {getLayout(<Component {...pageProps} />)}
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </ApiProvider>
    </CacheProvider>
  );
};

export default App;
