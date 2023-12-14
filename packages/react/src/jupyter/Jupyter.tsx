/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import React, { FC, useMemo } from 'react';
import { ThemeProvider, BaseStyles, Box } from "@primer/react";
import { ErrorBoundary } from 'react-error-boundary';
import { JupyterContextProvider } from './JupyterContext';
import JupyterLabCss from './lab/JupyterLabCss';
import { getJupyterServerHttpUrl, getJupyterServerWsUrl, loadJupyterConfig } from './JupyterConfig';
import defaultInjectableStore, { InjectableStore } from '../state/redux/Store';
import { JupyterLabTheme } from "./lab/JupyterLabTheme";

/**
 * Definition of the properties that can be passed
 * when creating a Jupyter context.
 */
export type JupyterProps = {
  collaborative?: boolean;
  defaultKernelName?: string;
  disableCssLoading?: boolean;
  injectableStore?: InjectableStore;
  jupyterServerHttpUrl?: string;
  jupyterServerWsUrl?: string;
  jupyterToken?: string;
  lite?: boolean;
  startDefaultKernel?: boolean;
  terminals?: boolean;
  theme?: JupyterLabTheme;
  useRunningKernelId?: string;
  useRunningKernelIndex?: number;
}

/**
 * The component to be used as fallback in case of error.
 */
const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Oops, something went wrong.</p>
      <pre>{error.message}</pre>
      <div style={{ visibility: "hidden" }}>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  )
}

/**
 * The Jupyter context. This handles the needed initialization
 * and ensure the Redux and the Material UI theme providers
 * are available.
 */
export const Jupyter: FC<React.PropsWithChildren<JupyterProps>> = (props: React.PropsWithChildren<JupyterProps>) => {
  const {
    collaborative = false,
    children,
    defaultKernelName = 'python',
    disableCssLoading = false,
    injectableStore,
    jupyterServerHttpUrl,
    jupyterServerWsUrl,
    jupyterToken,
    lite = false,
    startDefaultKernel = false,
    theme = 'light',
    terminals = false,
    useRunningKernelId,
    useRunningKernelIndex = -1,
  } = props;
  const config = useMemo(() => {
    return loadJupyterConfig({
      collaborative,
      jupyterServerHttpUrl,
      jupyterServerWsUrl, lite,
      jupyterToken, terminals
    });
  }, [collaborative,
    jupyterServerHttpUrl,
    jupyterServerWsUrl,
    jupyterToken, lite, terminals]);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => { console.log('Error Boundary reset has been invoked...'); }}
    >
      <ThemeProvider colorMode={theme === 'light' ? "day" : "night"} dayScheme="light" nightScheme="dark_high_contrast">
        <BaseStyles>
          <Box color="fg.default" bg="canvas.default">
            {!config.insideJupyterLab && !disableCssLoading && <JupyterLabCss theme={theme} />}
            <JupyterContextProvider
              baseUrl={getJupyterServerHttpUrl()}
              collaborative={collaborative}
              defaultKernelName={defaultKernelName}
              disableCssLoading={disableCssLoading}
              injectableStore={injectableStore || defaultInjectableStore}
              lite={lite}
              startDefaultKernel={startDefaultKernel}
              theme={theme}
              useRunningKernelId={useRunningKernelId}
              useRunningKernelIndex={useRunningKernelIndex ?? -1}
              variant="default"
              wsUrl={getJupyterServerWsUrl()}
            >
              {children}
            </JupyterContextProvider>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default Jupyter;
