import { ApolloServer, gql } from 'apollo-server'

const tasks = [
  {
    id: 1,
    title: 'Do laundry',
    description: 'Wash, dry, fold',
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, cheese',
  },
  {
    id: 3,
    title: 'Wash car',
    description: 'Soap, water, sponge',
  },
  {
    id: 4,
    title: 'Do dishes',
    description: 'Soap, water, sponge',
  }
]

const typeDefs = gql`
  type Task {
    id: ID! 
    title: String!
    description: String
  }

  type Query {
    allTasks: [Task]!
    tasksCount: Int!
    findTaskById(id: ID!): Task
    findTaskByTitle(title: String!): Task
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