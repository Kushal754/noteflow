# Configuración de Herramientas de Inteligencia Artificial

## Contexto Técnico Aplicado
Para maximizar la eficiencia y mantener la coherencia arquitectónica, se ha configurado un entorno de asistencia basado en IA inyectando directrices estrictas a través de un archivo `.cursorrules`.

## Reglas de Contexto (ver `.cursorrules`)
Se han definido restricciones clave:
* Framework: Expo SDK 56 con TypeScript estricto.
* Navegación: `expo-router` (Tabs).
* Interfaz: `react-native-paper` (prohibido usar HTML/CSS web).
* Estado: `zustand` y `AsyncStorage`.

## Justificación
Esta preconfiguración asegura que la IA comprenda la arquitectura móvil (separación entre el JS Thread y el UI Thread), impidiendo que proponga parches web que penalicen el rendimiento nativo.