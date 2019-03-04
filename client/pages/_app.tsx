import * as React from 'react';
import App, { Container } from 'next/app';
import ErrorPage from 'next/error';
import Layout from '../components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Toggle.css';
import { toast } from 'react-toastify';
import EthereumProvider from '../components/EthereumProvider';

type Props = {
  Component: any;
  router: any;
  ctx: any;
  account?: string;
  provider?: any;
  query?: any;
};

interface State {
  hasError: boolean;
  error: Error | {};
  errorCode: number;
}

export default class MyApp extends App<Props> {
  state: State = {
    hasError: false,
    error: {},
    errorCode: 200,
  };

  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  // https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
  static async getInitialProps({ Component, router, ctx }: Props) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, query: ctx.query };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.router.push('/', '/');
    console.log('CUSTOM ERROR', error);
    console.log('errorInfo:', errorInfo);
    toast.error(error.message);
    // this.setState({
    //   hasError: false
    // })

    // // TODO: log error to reporting service

    // // save logs in local storage
    // const persistedState = loadState();
    // const log = { error: error.message };
    // const newLogs = persistedState && persistedState.logs ? persistedState.logs.concat(log) : [log];
    // saveState({ logs: newLogs });
  }

  render() {
    const { Component, pageProps, query } = this.props;
    const { hasError } = this.state;

    return (
      <Container>
        <Layout title={pageProps.title || 'Panvala'}>
          <EthereumProvider>
            {hasError ? <ErrorPage statusCode={404} /> : <Component {...pageProps} query={query} />}
          </EthereumProvider>
        </Layout>
      </Container>
    );
  }
}
