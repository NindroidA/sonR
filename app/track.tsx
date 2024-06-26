import { Stack } from 'expo-router';

import { TrackPage } from '@/pages/TrackPage';

export default function Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Track',
          headerTitleStyle: {
            color: '#ffffff'
          },
          headerStyle: {
            backgroundColor: '#121212',
          }
        }}
      />
      <TrackPage />
    </>
  );
}
