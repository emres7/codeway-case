const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { PubSub } = require('@google-cloud/pubsub');
const loader = require('./loaders');



loader();
const app = express()

// Creates a client; cache this for further use
const projectId = process.env.PROJECT_ID
const topicId = process.env.TOPIC_ID
const pubSubClient = new PubSub({projectId});


async function quickstart(
) {
  let projectId = 'projectname' // Your Google Cloud Platform project ID
  let topicNameOrId = 'topicname' // Name for the new topic to create
  let subscriptionName = 'subscrptionname' // Name for the new subscription to create
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });

  // Send a message to the topic
  topic.publishMessage({data: Buffer.from('Test message!')});
}


app.post('/logs', async (req, res) => {
  let logData = req.body; // Extract event log data from the request

  try {
    const data = "Hello, world!"
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);

    const messageId = await pubSubClient
      .topic(topicId)
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    res.sendStatus(500);
    process.exitCode = 1;
  }
});

app.post('/logs1', async (req, res) => {
  try{
    quickstart()
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    res.sendStatus(500);
    process.exitCode = 1;
  }
})



app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);

});

