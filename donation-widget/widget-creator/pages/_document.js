import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(
      ctx
    );
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script src='https://panvala.vercel.app/widget.js' />
        </Head>
        <body>
          <Main />
          <div id='panWidget'></div>
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              panWidget.init({"defaultAmount":"4","toAddress":"0x6d0214227c0A521C282215ED2c6b16ADBaEA5ea7"})
            `,
            }}
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
