/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Text, ToggleSwitch, ThemeProvider, useTheme } from "@primer/react";
import { ThemeManager } from '@jupyterlab/apputils';
import { RunningSessions } from '@jupyterlab/running';
import Jupyter from '../jupyter/Jupyter';
import Lumino from '../jupyter/lumino/Lumino';
import { JupyterLabTheme } from '../jupyter/lab/JupyterLabTheme';
import JupyterLabApp from "../components/jupyterlab/JupyterLabApp";
import JupyterLabAppAdapter from "../components/jupyterlab/JupyterLabAppAdapter";

import * as darkThemeExtension from '@jupyterlab/theme-dark-extension';
import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as runningExtension from '@jupyterlab/running-extension';

const RunningSessionsExample = () => {
  const [runningSessions, setRunningSessions] = useState<RunningSessions>();
  const [theme, setTheme] = useState<JupyterLabTheme>('light');
  const [jupyterLabAdapter, setJupyterlabAdapter] = useState<JupyterLabAppAdapter>();
  const { setColorMode } = useTheme();
  const [isDark, setDark] = useState(false);
  const onSwitchClick = async () => {
    if (jupyterLabAdapter) {
      await jupyterLabAdapter.commands.execute('apputils:change-theme', {
        theme: isDark ? 'JupyterLab Light' : 'JupyterLab Dark',
      });
      setTheme(isDark ? 'light' : 'dark');
      setColorMode(isDark ? 'night' : 'day');
    }
    setDark(!isDark);
  }
  const handleSwitchChange = (dark: boolean) => {
    setDark(dark);
  }
  const onJupyterLab = async (jupyterLabAdapter: JupyterLabAppAdapter) => {
    setJupyterlabAdapter(jupyterLabAdapter);
    const runningSessionManagers = jupyterLabAdapter.service('@jupyterlab/running-extension:plugin');
    const runningSessions = new RunningSessions(runningSessionManagers);
    setRunningSessions(runningSessions);
  }
  const onPlugin = (themeManager: ThemeManager) => {
    console.log('Current theme', themeManager.theme);
  }
  return (
    <>
      <Jupyter startDefaultKernel={false} disableCssLoading={true} theme="light">
        <ThemeProvider colorMode={theme === 'light' ? "day" : "night"} dayScheme="light" nightScheme="dark_high_contrast">
          <Box display="flex" color="fg.default" bg="canvas.default">
            <Box mr={3}>
              <Text as="h2">JupyterLab Headless Application</Text>
            </Box>
            <Box>
              <Box>
              <Text fontSize={2} fontWeight="bold" id="switch-label" display="block" mb={1}>Dark theme</Text>
              </Box>
              <Box>
                <ToggleSwitch
                  size="small"
                  onClick={onSwitchClick}
                  onChange={handleSwitchChange}
                  checked={isDark}
                  statusLabelPosition="end"
                  aria-labelledby="switch-label"
                />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
        { runningSessions && 
          <Lumino height="300px">
            {runningSessions}
          </Lumino>
         }
        <JupyterLabApp
          extensions={[
            lightThemeExtension,
            darkThemeExtension,
            runningExtension,
          ]}
          headless={true}
          onJupyterLab={onJupyterLab}
          pluginId="@jupyterlab/apputils-extension:themes"
          PluginType={ThemeManager}
          onPlugin={onPlugin}
        />
      </Jupyter>
    </>
  )
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(<RunningSessionsExample/>);
