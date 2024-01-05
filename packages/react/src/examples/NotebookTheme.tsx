/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Text, ToggleSwitch, theme as primerTheme } from '@primer/react';
import { Theme } from '@primer/react/lib/ThemeProvider';
import { INotebookContent } from '@jupyterlab/nbformat';
import Jupyter from '../jupyter/Jupyter';
import Notebook from '../components/notebook/Notebook';
import NotebookToolbar from './toolbars/NotebookToolbar';
import CellSidebar from '../components/notebook/cell/sidebar/CellSidebar';

import nbformat from './notebooks/NotebookExample1.ipynb.json';

const NotebookTheme = () => {
  const [theme, setTheme] = useState<Theme>();
  const [isOn, setIsOn] = useState(false);
  const onClick = () => {
    if (isOn) {
      setTheme(primerTheme);
    } else {
      setTheme(undefined);
    }
    setIsOn(!isOn);
  };
  const handleSwitchChange = (on: boolean) => {
    setIsOn(on);
  };
  return (
    <>
      <Jupyter theme={theme}>
        <Text
          fontSize={2}
          fontWeight="bold"
          id="switch-label"
          display="block"
          mb={1}
        >
          Primer Theme
        </Text>
        <ToggleSwitch
          size="small"
          onClick={onClick}
          onChange={handleSwitchChange}
          checked={isOn}
          statusLabelPosition="end"
          aria-labelledby="switch-label"
        />
        <Notebook
          nbformat={nbformat as INotebookContent}
          uid="notebook-model-uid"
          externalIPyWidgets={[
            { name: '@widgetti/jupyter-react', version: '0.3.0' },
            { name: 'bqplot', version: '0.5.42' },
            { name: 'jupyter-matplotlib', version: '0.11.3' },
          ]}
          height="calc(100vh - 2.6rem)" // (Height - Toolbar Height).
          cellSidebarMargin={120}
          CellSidebar={CellSidebar}
          Toolbar={NotebookToolbar}
        />
      </Jupyter>
    </>
  );
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);

root.render(<NotebookTheme />);