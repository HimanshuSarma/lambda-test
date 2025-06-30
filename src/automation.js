const serverless = require("serverless-http");
const express = require("express");

const { EC2Client, StartInstancesCommand, StopInstancesCommand } = require("@aws-sdk/client-ec2");

const app = express();
app.use(express.json())

app.post(
  `/api/startEc2Instance`,
  async (req, res, next) => {
    const instanceId = req?.body?.instanceId;
    const region = req?.body?.region;
    const client = new EC2Client({ region: region });

    const params = {
      InstanceIds: [instanceId],
    };

    try {
      const command = new StopInstancesCommand(params);
      const response = await client.send(command);
      console.log(`Successfully sent request to start instance: ${instanceId}`);
      return res.status(200).send("done")
    } catch (error) {
      console.error(`Error starting instance ${instanceId}:`, error);
    }
  }
) 

module.exports.startEc2Instance = serverless(app);