import type { Preview } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import '../src/styles/globals.css';
import { NexusThemeProvider } from '../src/components/Theme/NexusThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        pixel7: {
          name: 'Pixel 7',
          styles: { width: '412px', height: '915px' },
        },
        iphone14promax: {
            name: 'iPhone 14 Pro Max',
            styles: { width: '430px', height: '932px' },
        }
      },
    },
    layout: 'padded', 
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story: React.ComponentType, context: any) => {
      const theme = context.globals.theme as string;
      const validTheme = (theme === 'dark' || theme === 'light') ? theme : undefined;

      // Sync class on documentElement for Tailwind
      React.useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
      }, [theme]);

      return (
          <div className={theme === 'dark' ? 'dark bg-background text-foreground min-h-screen p-4' : 'bg-background text-foreground min-h-screen p-4'}>
             <NexusThemeProvider forcedTheme={validTheme}>
                <Story />
             </NexusThemeProvider>
          </div>
      );
    },
  ],
};

export default preview;