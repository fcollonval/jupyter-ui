/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import {render} from 'react-dom';
import {Jupyter} from '@datalayer/jupyter-react';
import OutputsToolbar from './outputs/OutputsToolbar';
import OutputsComponents from './outputs/OutputsComponents';
import Layers from '../layout/Layers';

import './../App.css';

const div = document.createElement('div');
document.body.appendChild(div);

render(
  <Jupyter collaborative={false} terminals={false}>
    <Layers />
    <OutputsToolbar />
    <OutputsComponents />
  </Jupyter>,
  div
);
