import { Stack } from 'expo-router';

import { WelcomePage } from '@/pages/WelcomePage';

export default function Index() {
  return (
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
}
