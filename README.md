# Calculadora móvil

Aplicación móvil de calculadora desarrollada con **React Native (Expo)** para el curso *Proyectos de ingeniería de software* (Universidad Tecmilenio).

El proyecto se gestiona con **Scrum** en Jira y el código se integra mediante ramas y Pull Requests con revisión entre pares.

## Equipo

| Integrante | Rol Scrum |
| --- | --- |
| Kevin Khaled López Fuentes | Scrum Master / Developer |
| Bruno Iván Santos Villarruel | Product Owner / Developer |

## Cómo ejecutar

```bash
npm install
npx expo start    # abre la app con Expo Go en Android o iOS
npm test          # ejecuta las pruebas unitarias
```

## Estructura

```
src/
  logic/        # lógica de la calculadora (sin dependencias de la interfaz)
    __tests__/  # pruebas unitarias con Jest
App.js          # pantalla principal
```

## Estrategia de ramas

- `main`: versión estable. Recibe cambios de `develop` al cierre de cada Sprint.
- `develop`: rama de integración. Solo recibe cambios mediante Pull Requests aprobados.
- `feature/SCRUM-<n>-<descripcion>`: una rama por tarea de Jira, creada desde `develop`.

Los mensajes de commit inician con la clave de la tarea de Jira, por ejemplo `SCRUM-16: agrega tokenizador de expresiones`.
