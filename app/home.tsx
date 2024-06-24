import { Stack } from 'expo-router';

import { HomePage } from '@/pages/HomePage';

export default function Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerTitleStyle: {
            color: '#ffffff'
          },
          headerStyle: {
            backgroundColor: '#121212',
          }
        }}
      />
      <HomePage />
    </>
  );
}
