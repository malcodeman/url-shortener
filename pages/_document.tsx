import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta
            name="og:description"
            content="ttier - top tier url shortener"
          />
          <meta name="description" content="ttier - top tier url shortener" />
          <meta property="og:image" content="opengraph.png"></meta>
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <div id="root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
