# GraphQL y Apollo Server

## Introducción

### ¿Qué es GraphQL?

- Lenguaje de consulta para APIs.
- Permite a los clientes pedir exactamente los datos que necesitan.
- Ventajas:
  - Menos tráfico de red.
  - Consultas más eficientes.

### ¿Qué es Apollo Server?

- Biblioteca para crear servidores GraphQL.
- Facilita la definición del esquema y los resolvers.

## Componentes Principales

### Esquema (Schema)

- Define la estructura de la API.
- Utiliza el GraphQL Schema Language.
- Contiene:
  - Tipos de datos: son los objetos que se pueden consultar.
  - Consultas (Queries): operaciones de lectura.
  - Mutaciones (Mutations): operaciones de escritura.

### Resolvers

- Funciones que manejan las solicitudes.
- Contienen la lógica para obtener y modificar datos.

## Paso a Paso para Crear un Servidor con Apollo Server

### 1. Instalación de Dependencias

```bash
npm install apollo-server graphql uuid
```

### 2. Importación de Dependencias

```javascript
import { ApolloServer, gql } from 'apollo-server';
import { v1 as uuid } from 'uuid';
```

### 3. Datos Simulados

```javascript
const tasks = [
  {
    id: "46e6bfa0-d972-11ed-a9eb-1f40628008de",
    title: 'Do laundry',
    description: 'Wash, dry, fold',
    priority: {
      high: true,
      medium: false,
    }
  },
  {
    id: "46e6bfa0-d972-11ed-a9eb-1f40628008fa",
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, cheese',
    priority: {
      high: false,
      medium: true,
    }
  },
  {
    id: "46e6bfa0-d972-11ed-a9eb-1f40628008ra",
    title: 'Wash car',
    description: 'Soap, water, sponge',
    priority: {
      high: false,
      medium: false,
    }
  },
  {
    id: "46e6bfa0-d972-11ed-a9eb-1f40628008da",
    title: 'Do dishes',
    description: 'Soap, water, sponge',
    priority: {
      high: false,
      medium: false,
    }
  }
];
```

### 4. Definición del Esquema

```javascript
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    priority: Priority
  }

  type Priority {
    high: Boolean!
    medium: Boolean!
  }

  type Query {
    allTasks: [Task]!
    tasksCount: Int!
    findTaskById(id: ID!): Task
    findTaskByTitle(title: String!): Task
  }

  type Mutation {
    createTask(title: String!, description: String): Task
    deleteTask(id: ID!): Task
  }
`;
```

### 5. Resolvers

```javascript
const resolvers = {
  Query: {
    tasksCount: () => tasks.length,
    allTasks: () => tasks,
    findTaskById: (root, args) => {
      const { id } = args;
      return tasks.find(task => task.id === id);
    },
    findTaskByTitle: (root, args) => {
      const { title } = args;
      return tasks.find(task => task.title === title);
    },
  },
  Mutation: {
    createTask: (root, args) => {
      const { title, description } = args;
      const newTask = {
        id: uuid(),
        title,
        description,
        priority: {
          high: false,
          medium: false,
        }
      };
      tasks.push(newTask);
      return newTask;
    },
    deleteTask: (root, args) => {
      const { id } = args;
      const task = tasks.find(task => task.id === id);
      tasks.splice(tasks.indexOf(task), 1);
      return task;
    }
  }
};
```

### 6. Configuración y Ejecución del Servidor

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

## Resumen

- Definición del esquema con tipos, consultas y mutaciones.
- Implementación de resolvers para manejar operaciones.
- Configuración y ejecución del servidor Apollo.

## Ventajas de Usar Apollo Server con GraphQL

- Consulta precisa de datos.
- Esquema definido como contrato.
- Flexibilidad y extensibilidad.

## Recursos Adicionales

- [Documentación de Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Schema Language](https://graphql.org/learn/schema/)
- [GraphQL Playground](https://www.apollographql.com/tutorials/browse?languages=JavaScript)
