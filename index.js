import { ApolloServer, gql } from 'apollo-server'
import {v1 as uuid} from 'uuid'

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
]

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
`

const resolvers = {
  Query: {
    tasksCount: () => tasks.length,
    allTasks: () => tasks,
    findTaskById: (root, args) => {
      const { id } = args
      return tasks.find(task => task.id === id)
    },
    findTaskByTitle: (root, args) => {
      const { title } = args
      return tasks.find(task => task.title === title)
    },
  },
  Mutation: {
    createTask: (root, args) => {
      const { title, description } = args
      const newTask = {
        id: uuid(),
        title,
        description,
        priority: {
          high: false,
          medium: false,
        }
      }
      tasks.push(newTask)
      return newTask
    },
    deleteTask: (root, args) => {
      const { id } = args
      const task = tasks.find(task => task.id === id)
      tasks.splice(tasks.indexOf(task), 1)
      return task
    }
  }
}

// Se pueden renombrar los resolvers y los types

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})