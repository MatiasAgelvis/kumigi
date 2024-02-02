import Layout from "app/core/layouts/Layout";
import UserGalleryComponent from "app/components/gallery/user";
import { Suspense } from "react";

const UserGallery = () => {
  return (
    <Layout title="Your Gallery">
      <main>
        <Suspense fallback={"loading"}>
          <UserGalleryComponent />
        </Suspense>
      </main>
    </Layout>
  );
};

export default UserGallery;
