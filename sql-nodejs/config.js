var config = {}


//config.endpoint = 'https://languye-sql-nb3.documents.azure.com:443/'
//config.key = 'G1Wlxck6MhT6w2LNjKmEObPVWLBbcdAio01Fyh1EYfcJPWt0fszjnuTxLIA8Kyd5T6EhAXYCllkWq8za0TaxHg=='

config.database = {
  id: 'ToDoList'
}

config.container = {
  id: 'Items'
}
config.partitionKey = { kind: "Hash", paths: ["/visitors"] }



module.exports = config
