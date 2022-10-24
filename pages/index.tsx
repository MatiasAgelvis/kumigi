import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import Designer from "app/components/designer";
import { layers__Default } from "app/utils/createCard";
import { useRecoilState } from "recoil";
import { layersAtom } from "app/utils/store";

const Home: BlitzPage = () => {
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom);
  return (
    <Layout title="Home" withFooter>
      <main>
        <Designer initialLayersState={editorLayers} />
      </main>
    </Layout>
  );
};

export default Home;
