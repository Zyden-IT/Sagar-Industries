import Layout from "@/shared/Layout";
import "@/styles/global.css";
import "@/styles/responsive.scss";
import "@/styles/style.scss";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
