# 📝 NoteFlow

## Logline

Tu flujo de ideas, notas y tareas sin fricciones, optimizado para el rendimiento móvil nativo.

## Descripción breve

Aplicación móvil nativa desarrollada con **React Native** y **Expo** para la gestión inteligente de notas de texto, listas de tareas (*checklists*) e ideas organizadas mediante etiquetas. Implementa una arquitectura moderna basada en la gestión de estado global persistente, validación robusta de formularios en tiempo de ejecución y retroalimentación háptica nativa para mejorar la experiencia de usuario.

## Entorno de ejecución

Aplicación móvil ejecutada localmente mediante **Expo Go** y **Metro Bundler**, diseñada bajo una arquitectura *offline-first*.

## Características

1. **Gestión híbrida de contenido:** Soporte integrado para notas de texto, listas de tareas y colecciones de ideas organizadas mediante etiquetas y colores.
2. **Búsqueda en tiempo real:** Sistema de filtrado instantáneo que permite localizar contenido mediante coincidencia de texto.
3. **Validación robusta con Zod:** Formularios protegidos mediante validación en tiempo de ejecución para evitar datos inválidos y mejorar la experiencia del usuario.
4. **Renderizado optimizado:** Uso de `@shopify/flash-list` para mejorar el rendimiento y la fluidez al mostrar listas extensas de elementos.
5. **Feedback háptico nativo:** Integración de respuestas táctiles mediante vibración física para reforzar las interacciones principales de la aplicación.

## Tecnologías

### Frontend

* **React Native:** Desarrollo de interfaces móviles nativas multiplataforma.
* **Expo:** Entorno de desarrollo y acceso a funcionalidades nativas.
* **TypeScript:** Tipado estático para mejorar la mantenibilidad y seguridad del código.
* **React Native Paper:** Biblioteca de componentes basada en Material Design 3.

### Estado y persistencia

* **Zustand:** Gestor de estado global ligero, desacoplado y escalable.
* **AsyncStorage:** Sistema de almacenamiento persistente local tipo *key-value*.

### Tecnologías auxiliares

* **Zod:** Validación robusta de datos y formularios.
* **Expo Haptics:** Implementación de respuestas táctiles nativas.
* **Shopify FlashList:** Optimización del renderizado de listas de gran tamaño.

## Estructura del proyecto

```text
noteflow/
├── app/                    # Enrutador principal de la aplicación (Expo Router)
│   ├── (tabs)/             # Pestañas principales (Notas, Checklists e Ideas)
│   ├── nota/
│   │   └── [id].tsx        # Pantalla dinámica de detalle
│   ├── nueva-nota.tsx      # Formulario de creación de contenido
│   └── _layout.tsx         # Configuración global de navegación
│
├── components/             # Componentes reutilizables
│   └── NoteCard.tsx
│
├── store/                  # Gestión del estado global
│   └── notesStore.ts
│
├── types/                  # Tipos e interfaces TypeScript
│   └── index.ts
│
├── package.json
└── README.md
```

## Descargar y ejecutar

```bash
git clone https://github.com/Kushal754/noteflow
cd noteflow

npm install --legacy-peer-deps
npx expo start -c
```

Una vez iniciado el servidor de desarrollo, escanea el código QR utilizando **Expo Go** desde un dispositivo Android o iOS.

## Publicación y distribución

> Al tratarse de una aplicación móvil nativa con arquitectura *offline-first*, la distribución se realiza mediante **Expo Application Services (EAS)** y no mediante plataformas de hosting web como Vercel.

### Frontend

**A.** Crear una cuenta en Expo e iniciar sesión:

```bash
npx expo login
```

**B.** Configurar el archivo `app.json` con los identificadores, nombre y versión de la aplicación.

**C.** Publicar o generar una build mediante EAS:

```bash
eas build
```

### Persistencia y escalabilidad

**A.** Actualmente la persistencia se realiza localmente mediante `AsyncStorage`.

**B.** Para migrar a un backend remoto, bastará con definir la URL base de una API dentro de la capa de servicios o del store.

**C.** Las acciones de Zustand podrán sincronizar el estado local con una base de datos externa mediante peticiones REST o GraphQL.

## Arquitectura

* Patrón *offline-first*.
* Estado global centralizado mediante Zustand.
* Persistencia local automática con AsyncStorage.
* Navegación basada en Expo Router.
* Validación de formularios con Zod.
* Componentes reutilizables y tipado estricto con TypeScript.

## Licencia

Proyecto desarrollado con fines educativos y de aprendizaje. Libre para su adaptación y ampliación según las necesidades del desarrollador.
