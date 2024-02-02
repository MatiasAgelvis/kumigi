import Layout from "app/core/layouts/Layout";
import Designer from "app/components/designer";
import { useRecoilState } from "recoil";
import { layersAtom } from "app/utils/store";

const Home = () => {
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
