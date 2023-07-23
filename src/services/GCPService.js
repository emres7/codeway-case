const { PubSub } = require("@google-cloud/pubsub");
const { BigQuery } = require("@google-cloud/bigquery");
const { withServiceErrorHandling } = require("../utils/ServiceErrorHandler");
const dotenv = require("dotenv");
dotenv.config();

const projectId = process.env.PROJECT_ID;
const topicId = process.env.TOPIC_ID;

const datasetId = process.env.DATASET_ID;
const tableId = process.env.TABLE_ID;
const pubSubClient = new PubSub({ projectId });
const bigqueryClient = new BigQuery({ projectId });

const publishData = withServiceErrorHandling(async (publisableData) => {
  const reqData = {
    type: "event",
    session_id: "9FDA74C2-AB57-4840-87D0-64324772B5A2",
    event_name: "click",
    page: "main",
    event_time: 1589623711,
    country: "TR",
    region: "Marmaray",
    city: "Istanbul",
    user_id: "Uu1qJzlfrxYxOS5z1kfAbmSA5pF2",
  };
  const data = JSON.stringify(reqData);
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);
  const messageId = await pubSubClient
    .topic(topicId)
    .publishMessage({ data: dataBuffer });

  return messageId;
});

const retrieveFromQuery = withServiceErrorHandling(async (data) => {
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

  if (rows.length !== 0) {
    const analyticsData = rows[0];
    return analyticsData;
  }
});

module.exports = {
  publishData,
  retrieveFromQuery,
};
