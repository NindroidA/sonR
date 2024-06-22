import { Stack } from 'expo-router';

import { WelcomePage } from '@/pages/WelcomePage';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: 'Welcome',
      }}
    />
    <WelcomePage />
  </>
);

export default Home;
