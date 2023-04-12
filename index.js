import { ApolloServer, gql } from 'apollo-server'
import {v1 as uuid} from 'uuid'

const tasks = [
  {
    id: 1,
    title: 'Do laundry',
    description: 'Wash, dry, fold',
    priority: {
      high: true,
      medium: false,
    }
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, cheese',
    priority: {
      high: false,
      medium: true,
    }
  },
  {
    id: 3,
    title: 'Wash car',
    description: 'Soap, water, sponge',
    priority: {
      high: false,
      medium: false,
    }
  },
  {
    id: 4,
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
    id: Int!
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
    findTaskById(id: Int!): Task
    findTaskByTitle(title: String!): Task
  }

  type Mutation {
    createTask(title: String!, description: String): Task
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
        id: 5,
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