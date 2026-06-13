import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  
const theme = useTheme();
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, // Color del icono seleccionado
        tabBarStyle: { backgroundColor: theme.colors.background }, // Color del fondo de la barra
        headerStyle: { backgroundColor: theme.colors.background }, // Color de la cabecera superior
        headerTintColor: theme.colors.onSurface, // Color del texto de la cabecera
      }}
    >
      <Tabs.Screen
        name="notas"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note-text-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lightbulb-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}