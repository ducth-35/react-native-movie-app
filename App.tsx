import React, {useEffect} from 'react';
import {Navigations} from './src/navigators';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';

const _queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({fade: true});
    }, 500);
  }, []);

  return (
    <>
      <QueryClientProvider client={_queryClient}>
        <Navigations />
      </QueryClientProvider>
    </>
  );
};

export default App;
