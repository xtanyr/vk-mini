import React, { useState } from 'react';
import CatFactComponent from './CatFactComponent';
import AgePredictionComponent from './AgePredictionComponent';
import { createRoot } from 'react-dom/client';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  usePlatform,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState('cat');

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
            <Panel id="cat">
              <PanelHeader>Cat Facts</PanelHeader>
              <Group header={<Header mode="secondary">Get Fact About Cats in 1 Click</Header>}>
                <CatFactComponent></CatFactComponent>
              </Group>
              <Group>
                <CellButton onClick={() => setActivePanel('age')}>Go to Age Prediction </CellButton>
              </Group>
            </Panel>
            <Panel id="age">
              <PanelHeader>Age Guesser</PanelHeader>
              <Group header={<Header mode="secondary">Guess Your Age by Your Name</Header>}>
                <AgePredictionComponent></AgePredictionComponent>
              </Group>
              <Group>
                <CellButton onClick={() => setActivePanel('cat')}>Go to Cat Facts</CellButton>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);

export default App