/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import { createRoot } from 'react-dom/client';
import Jupyter from '../jupyter/Jupyter';
import Notebook from '../components/notebook/Notebook';
import NotebookToolbar from "./toolbars/NotebookToolbar";
import CellSidebar from "../components/notebook/cell/sidebar/CellSidebar";

const IPyLeaflet = () => (
  <Jupyter>
    <Notebook
      path="ipyleaflet.ipynb"
      uid="notebook-ipyleaflet-uid"
      externalIPyWidgets={[
        { name: "jupyter-leaflet", version: "0.18.0" },
      ]}
      height='calc(100vh - 2.6rem)' // (Height - Toolbar Height).
      cellSidebarMargin={120}
      CellSidebar={CellSidebar}
      Toolbar={NotebookToolbar}
    />
  </Jupyter>
)

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(
  <IPyLeaflet/>
);
