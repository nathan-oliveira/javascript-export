import ContextStrategy from "./base/contextStrategy"
import MongoDBStrategy from "./strategies/mongoDBStrategy"
import PostgresStrategy from "./strategies/postgresStrategy"

const postgresConnectionString = 'postgres://nathan:senha001@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = 'mongodb://nathan:senha001@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [
  {
    name: 'nathan',
    type: 'transaction'
  },
  {
    name: 'fulano',
    type: 'activityLog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
}

for (const { type, name } of data) {
  const context = contextTypes[type]
  await context.create({ name })
  console.log(context.read()) //context.dbStrategy.constructor.name
}

// await postgresContext.create({ name: data[0].name })
// console.log(postgresContext.read())