import * as React from 'react';
import App, { Container } from 'next/app';
import { SingletonRouter } from 'next/router';
import ErrorPage from 'next/error';
import { ToastContainer } from 'react-toastify';
// required: import css at top-level
// Note: CSS files can not be imported into your _document.js. You can use the _app.js instead or any other page.
// https://github.com/zeit/next-plugins/tree/master/packages/next-css#without-css-modules
import '../globalStyles.css';
import '../ReactToastify.css';
import Layout from '../components/Layout';
import EthereumProvider from '../components/EthereumProvider';
import MainProvider from '../components/MainProvider';
import NotificationsProvider from '../components/NotificationsProvider';

type IProps = {
  Component: any;
  router: SingletonRouter;
  ctx: any;
  pageProps: any;
};

interface IState {
  hasError: boolean;
  error?: Error;
  errorCode?: number;
}

export default class MyApp extends App<IProps, IState> {
  state: IState = {
    hasError: false,
  };

  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  // https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
  static async getInitialProps({ Component, ctx }: IProps) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  // this sets state with the error so the next render will show fallback UI
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.router.push('/', '/');
    console.log('CUSTOM ERROR', error);
    console.log('errorInfo:', errorInfo);
    // this.setState({
    //   hasError: true,
    //   error,
    // });

    // // TODO: log error to reporting service

    // // save logs in local storage
    // const persistedState = loadState();
    // const log = { error: error.message };
    // const newLogs = persistedState && persistedState.logs ? persistedState.logs.concat(log) : [log];
    // saveState({ logs: newLogs });
  }

  render() {
    const { Component, pageProps }: IProps = this.props;
    const { hasError, errorCode }: IState = this.state;

    if (hasError && errorCode) {
      return <ErrorPage statusCode={errorCode} />;
    }

    return (
      <Container>
        <EthereumProvider>
          <MainProvider>
            <NotificationsProvider>
              <Layout title={pageProps.title || 'Panvala'}>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MainProvider>
        </EthereumProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </Container>
    );
  }
}
