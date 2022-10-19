import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import Gallery from "app/components/gallery";

const Random: BlitzPage = () => {
  return (
    <Layout title="Random Gallery">
      <main>
        <Gallery />
      </main>
    </Layout>
  );
};

export default Random;
