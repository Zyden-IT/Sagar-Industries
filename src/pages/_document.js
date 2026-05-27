import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicons */}

          <link rel="icon" href="/favicon.ico" type="image/x-icon" />

          {/* Google Fonts */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Outfit:wght@100..900&family=Saira:wght@100..900&family=Jura:wght@300..700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Saira:wght@100..900&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="bg-card">
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
