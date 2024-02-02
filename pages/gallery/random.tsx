import Layout from "app/core/layouts/Layout";
import RandomGalleryComponent from "app/components/gallery/random";

const RandomGallery = () => {
  return (
    <Layout title="Random Gallery">
      <main>
        <RandomGalleryComponent />
      </main>
    </Layout>
  );
};

export default RandomGallery;
