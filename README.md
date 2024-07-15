# FSD Architecture

# Description

FSD (Feature-Sliced Design) is an architectural approach for organizing code in JavaScript/TypeScript projects, aimed at improving the maintainability and scalability of large applications. FSD focuses on dividing the project into clearly defined, functionally independent parts.

# Main Principles

- **Modularity**: The application is divided into autonomous modules, each performing a specific function or group of functions.

- **Hierarchy of Abstractions (Layers)**: Code is divided into different levels of abstraction (layers), which helps to avoid mixing logic.

- **Separation of Concerns (SOLID)**: Each module is responsible for only one part of the application's functionality.

- **Code Cleanliness**: Using clear and understandable principles for naming and structuring code.

# Project Structure

## Main Layers:

- **app**: The main module of the application, which includes global settings, configurations, and common components.

- **pages**: Application pages, each responsible for a specific section or functionality.

- **widgets**: Standalone modules that do not depend on each other. They can contain state.

- **features**: Functional blocks that can be used on different pages, containing specific business logic. For example, deleting from a cart, liking a post, updating something, etc.

- **entities**: Functional blocks that can be used on different pages but are more abstract and contain business logic. For example, Card, Book, Cart, Canvas, File, etc.

- **shared**: Common components, utilities, and styles used throughout the application. For example, Button, Checkbox, Input, Spinner, etc.

## Slices:

## Usage/Examples

```folder
src/
├── app/
│   ├── layouts/
│   ├── providers/
│   └── index.tsx
├── pages/
│   ├── HomePage/
│   └── ProfilePage/
├── features/
│   ├── Auth/
│   └── UserProfile/
├── entities/
│   ├── Auth/
│   └── Canvas/
│   └── File/
├── widgets/
│   └── CanvasPointDrawingW/
│   └── File/
├── shared/
│   ├── ui/
│   ├── constants/
│   └── lib/
│   └── types/

```

## Screenshots

![App Screenshot](https://feature-sliced.design/ru/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)
![App Screenshot](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETPRRT8PxQIwdgeDdW76C7fp6HjitTOqyhQ&s)

## Run Locally

Clone the project

```bash
  https://github.com/ElijahMinc/high-auth-react.git
```

Go to the project directory

```bash
  cd high-auth-react
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Command for build

```bash
  npm run build
```

## Demo

https://high-auth-fsd.netlify.app

## FSD Documentation

[Feature Sliced Design Documentation Link](https://feature-sliced.design/docs)
