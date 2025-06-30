const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

// Configure the AWS region. The SDK will automatically find credentials
// if running on an EC2 instance with an IAM role, Lambda function, etc.
const client = new DynamoDBClient({
  region: "us-east-1", // Replace with your AWS region (e.g., 'us-east-1')
});

// Use the DocumentClient for easier interaction with DynamoDB items
const docClient = DynamoDBDocumentClient.from(client);

async function getItem(tableName, primaryKeyName, primaryKeyValue) {
  const params = {
    TableName: tableName,
    Key: {
      [primaryKeyName]: primaryKeyValue, // e.g., { 'id': '123' }
    },
  };

  try {
    const command = new GetCommand(params);
    const result = await docClient.send(command);
    console.log(`Successfully fetched item from ${tableName}:`, result.Item);
    return result.Item;
  } catch (err) {
    console.error("Error getting item:", err);
    throw err;
  }
}

async function putItem(tableName, item) {
  const params = {
    TableName: tableName,
    Item: item, // The JavaScript object you want to store
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    console.log(`Successfully put item into ${tableName}:`, item);
  } catch (err) {
    console.error("Error putting item:", err);
    throw err;
  }
}

async function scanTable(tableName) {
  const params = {
    TableName: tableName,
  };

  try {
    const command = new ScanCommand(params);
    const result = await docClient.send(command);
    console.log(`Successfully scanned table ${tableName}:`, result.Items);
    return result.Items;
  } catch (err) {
    console.error("Error scanning table:", err);
    throw err;
  }
}

// --- Example Usage ---
// (async () => {
//   const tableName = "YourTestTable"; // Replace with your DynamoDB table name
//   const primaryKey = "id"; // Replace with your table's primary key name

//   // Example: Put an item
//   const newItem = {
//     id: "1",
//     name: "Alice",
//     age: 30,
//     city: "New York",
//   };
//   await putItem(tableName, newItem);

//   // Example: Get an item
//   await getItem(tableName, primaryKey, "1");

//   // Example: Put another item
//   const anotherItem = {
//     id: "2",
//     name: "Bob",
//     age: 25,
//     city: "London",
//   };
//   await putItem(tableName, anotherItem);

//   // Example: Scan the table
//   await scanTable(tableName);

// })();

module.exports = {
  getItem,
  putItem
}