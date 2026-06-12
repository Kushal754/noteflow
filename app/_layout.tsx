import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';

export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  
  
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    
    <PaperProvider theme={theme}>
      {/* Iniciamos el sistema de rutas de Expo Router */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Aquí le diremos a Expo que busque la carpeta de las pestañas más adelante */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}