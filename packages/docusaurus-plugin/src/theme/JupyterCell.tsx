/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import React from 'react';
import BrowserOnly from '@docusaurus/core/lib/client/exports/BrowserOnly';

const JupyterCell = (props: any) => {
  const { token, serverHttpUrl, serverWsUrl, source } = props;
  return (
    <BrowserOnly
      fallback={<div>Jupyter Cell fallback content for prerendering.</div>}>
      {() => {
        // Keep the import via require in the BrowserOnly code block.
        const { Jupyter } = require('@datalayer/jupyter-react/lib/jupyter/Jupyter');
        const { Cell } = require('@datalayer/jupyter-react/lib/components/cell/Cell');
        return (
          <>
            <Jupyter
              jupyterToken={token}
              jupyterServerHttpUrl={serverHttpUrl}
              jupyterServerWsUrl={serverWsUrl}
              disableCssLoading={true}
            >
              <Cell source={source}/>
            </Jupyter>
          </>
        )
      }}
    </BrowserOnly>
  )
}

export default JupyterCell;
