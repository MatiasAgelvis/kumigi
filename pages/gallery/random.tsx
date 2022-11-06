import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import RandomGalleryComponent from "app/components/gallery/random";

const RandomGallery: BlitzPage = () => {
  return (
    <Layout title="Random Gallery">
      <main>
        <RandomGalleryComponent />
      </main>
    </Layout>
  );
};

export default RandomGallery;
