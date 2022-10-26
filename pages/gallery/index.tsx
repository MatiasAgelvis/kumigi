import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import Gallery from "app/components/gallery";
import sizeComponents from "app/components/sizeComponents";
import buttonOptions from "app/utils/buttonOptions";
import AccordionMenu from "app/components/designer/accordionMenu/accordionMenu";
import boxOptions from "app/utils/boxOptions";

const UserGallery: BlitzPage = () => {
  return (
    <Layout title="Random Gallery">
      <main>
        <AccordionMenu
          name="Size Options"
          options={sizeComponents()}
          buttonProps={buttonOptions}
          wrapperProps={{ px: boxOptions.p }}
        />
        <Gallery />
      </main>
    </Layout>
  );
};

export default UserGallery;
