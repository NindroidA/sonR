import { Stack } from 'expo-router';

import { WelcomePage } from '@/pages/WelcomePage';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: 'Welcome',
        headerTitleStyle: {
          color: '#ffffff'
        },
        headerStyle: {
          backgroundColor: '#121212',
        }
      }}
    />
    <WelcomePage />
  </>
);

export default Home;
