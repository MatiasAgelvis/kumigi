import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import UserGalleryComponent from "app/components/gallery/user";
import { Suspense } from "react";

const UserGallery: BlitzPage = () => {
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
