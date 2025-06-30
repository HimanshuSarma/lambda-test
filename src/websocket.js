const AWS = require('aws-sdk');

const apiGwManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: '2018-11-29',
  endpoint: process.env.WEBSOCKET_API_ENDPOINT
});

console.log(process.env.WEBSOCKET_API_ENDPOINT)

async function sendMessageToClient(connectionId, payload) {
  console.log(connectionId, payload, "sendMessageToClient")
  try {
    await apiGwManagementApi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(payload) }).promise();
    console.log(`Message sent to ${connectionId}: ${JSON.stringify(payload)}`);
  } catch (e) {
    if (e.statusCode === 410) {
      // 410 Gone means the connection is no longer valid.
      // In a real app, you'd remove it from your DB here.
      console.log(`Connection ${connectionId} is stale or closed (410 Gone).`);
    } else {
      console.error(`Failed to post to connection ${connectionId}:`, e);
      throw e;
    }
  }
}

// const crud = require('./db/crud')
// const validators = require('./db/validators')
// const {getDbClient} = require('./db/clients')
const STAGE = process.env.STAGE || 'prod'

const connectHandler = async (event, context) => {
  try {
    // console.log(event.requestContext["connectionId"], `connectHandler`);
    return {
      statusCode: 200,
      body: "Connected"
    }
  } catch (err) {
    console.log(err, "catcherror")
  }
  
};


const disconnectHandler = async (event, context) => {
  console.log(event, `disconnectHandler`);
  return {
    statusCode: 200,
    body: "Disconnect"
  }
};

const sendMessage = async (event, context) => {
  console.log(typeof event.body, `sendMessage`);
  const parsedBody = JSON.parse(event.body);
  const connectionId = parsedBody.requestContext["connectionId"];
  await sendMessageToClient(
    connectionId, 
    {
      data: "teststring"
    }
  )
  return {
    statusCode: 200,
    body: "sendMessageTest"
  }
};

// module.exports.app = app
module.exports.sendMessage = sendMessage;
module.exports.connectHandler = connectHandler;
module.exports.disconnectHandler = disconnectHandler;