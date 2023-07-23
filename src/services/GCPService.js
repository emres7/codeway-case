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

const publishData = withServiceErrorHandling(async (publishableData) => {
  console.log(publishableData)
  const data = JSON.stringify(publishableData);
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
