import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import Gallery from "app/components/gallery";
import sizeComponents from "app/components/size/sizeComponents";
import buttonOptions from "app/utils/buttonOptions";
import AccordionMenu from "app/components/designer/accordionMenu/accordionMenu";
import boxOptions from "app/utils/boxOptions";
import getSimpleDesigns from "app/simple-designs/queries/getSimpleDesigns";
import { useInfiniteQuery, useQuery } from "@blitzjs/rpc";
import sizeFormatted from "app/components/size/sizeFormatted";

const UserGallery: BlitzPage = () => {
  const [
    projectPages,
    { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage },
  ] = useInfiniteQuery(
    getSimpleDesigns,
    (page = { take: 3, skip: 0 }) => page,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
  return (
    <Layout title="Random Gallery">
      <main>
        <AccordionMenu
          name="Size Options"
          body={sizeFormatted()}
          buttonProps={buttonOptions}
          wrapperProps={{ px: boxOptions.p }}
        />
        <Gallery
          layerGenerator={() => projectPages.map((x) => x.simpleDesigns)}
        />
      </main>
    </Layout>
  );
};

export default UserGallery;
