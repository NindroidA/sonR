import { Stack, useRouter } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';

import { WelcomePage } from '@/pages/WelcomePage';

export default function Index() {
  const router = useRouter();

  const navigateToHomePage = () => {
    router.push('/home');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigateToHomePage();
    }
  };

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
      <TouchableOpacity
        onPress={navigateToHomePage}
        style={{ flex: 1 }}
        {...(Platform.OS === 'web' ? {
          onKeyPress: handleKeyPress,
          tabIndex: 0
        } : {})}
      >
        <WelcomePage />
      </TouchableOpacity>
    </>
  );
}
