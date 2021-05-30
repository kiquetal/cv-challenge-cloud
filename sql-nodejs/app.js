//@ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('./config')
const url = require('url')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }

const options = {
      endpoint: endpoint,
      key: key,
      userAgentSuffix: 'CosmosDBJavascriptQuickstart'
    };

const dbContext = require("./databaseContext");


const client = new CosmosClient(options)


const database = client.database(databaseId);
const container = database.container(containerId);

// Make sure Tasks database is already setup. If not, create it.

async function createDatabase() {
await dbContext.create(client, databaseId, containerId);
}
/**
 * Cleanup the database and collection on completion
 */
async function cleanup() {
  await client.database(databaseId).delete()
}

async function incrementCounter()
{

 
const newItem = {
  id: "1",
  visitors: 1,
};

const { resource: createdItem } = await container.items.create(newItem);

console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.visitors}\r\n`);

	console.log("increment counter");
}

async function readContainer()
{
console.log("query container");
// query to return all items
const querySpec = {
  query: "SELECT * from c"
};

// read all items in the Items container
const { resources: items } = await container.items
  .query(querySpec)
  .fetchAll();

await console.log(JSON.stringify(items));
await console.log("----");
}

/**
 * Exit the app with a prompt
 * @param {string} message - The message to display
 */
function exit(message) {
  console.log(message)
  console.log('Press any key to exit')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}

createDatabase()
  .then(() => readContainer())
  .then(() => incrementCounter())
  .then(() => readContainer())
  .then(() => {
    exit(`Completed successfully`)
  })
  .catch(error => {
    exit(`Completed with error ${JSON.stringify(error)}`)
  })
