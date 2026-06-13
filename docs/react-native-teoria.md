# Fundamentos de React Native y Sistema de Diseño

## 1. React Native vs. App Nativa
React Native no traduce código a HTML5 ni usa WebViews. Ejecuta la lógica en un hilo de JavaScript y se comunica a través de un puente (Bridge/JSI) con los componentes nativos de Android/iOS. Esto otorga el rendimiento y aspecto de una app 100% nativa.

## 2. Arquitectura de Hilos (Threads)
* **JS Thread:** Ejecuta la lógica de la app, estado (Zustand) y ciclo de vida de React.
* **UI Thread:** Renderiza la interfaz y captura eventos táctiles.
* **Importancia:** Si el JS Thread se bloquea con operaciones pesadas, la interfaz se congela porque las instrucciones no llegan al UI Thread.

## 3. Metro Bundler
Es el empaquetador de JavaScript de React Native. Toma el árbol de archivos, resuelve dependencias y compila todo en un único `index.bundle`. Además gestiona el *Fast Refresh*.

## 4. Expo Go vs. Development Build
* **Expo Go:** Entorno de desarrollo rápido precompilado con módulos estándar. Ideal para empezar.
* **Development Build (EAS):** Binario personalizado necesario cuando se usan módulos nativos de terceros no incluidos en Expo Go. Es el estándar en producción.

## 5. Sistema de Diseño: React Native Paper
Elegido frente a Gluestack por su conformidad estricta con Material Design y su integración nativa y optimizada del `useTheme`, que facilita modos claro/oscuro sin sobrecargar el UI Thread.