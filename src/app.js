const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { PubSub } = require('@google-cloud/pubsub')
const { BigQuery } = require('@google-cloud/bigquery');

const loader = require('./loaders');



loader();
const app = express()

// Creates a client; cache this for further use
const projectId = process.env.PROJECT_ID
const topicId = process.env.TOPIC_ID

const datasetId = process.env.DATASET_ID
const tableId = process.env.TABLE_ID

const pubSubClient = new PubSub({projectId});
const bigqueryClient = new BigQuery({projectId});


app.post('/publish', async (req, res) => {
  let logData = req.body; // Extract event log data from the request
  try {
    const reqData = {
      "type": "event",
      "session_id": "9FDA74C2-AB57-4840-87D0-64324772B5A2", 
      "event_name": "click",
      "page": "main",
      "event_time": 1589623711,
      "country": "TR",
      "region": "Marmaray",
      "city": "Istanbul",
      "user_id": "Uu1qJzlfrxYxOS5z1kfAbmSA5pF2"
      }
    const data = JSON.stringify(reqData)
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    console.log(dataBuffer)
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


app.get('/analytics', async (req, res) => {
  try {
    // Query to get the required analytics data
    const query = `
      SELECT
        COUNT(DISTINCT user_id) AS total_user_count,
        DATE(TIMESTAMP_SECONDS(event_time)) AS date,
        COUNTIF(DATE(TIMESTAMP_SECONDS(event_time)) = CURRENT_DATE()) AS daily_active_user_count
      FROM
        ${datasetId}.${tableId}
      GROUP BY
        date
    `;

    // Run the query
    const [rows] = await bigqueryClient.query(query);

    if (rows.length === 0) {
      res.status(404).send('No data available for today.');
    } else {
      const analyticsData = rows[0];
      res.status(200).json(analyticsData);
    }
  } catch (err) {
    console.error('Error fetching analytics data:', err);
    res.status(500).send('Error fetching analytics data.');
  }
});

app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);

});

