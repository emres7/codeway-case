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

const analyticsQuery = (datasetId, tableId) => {
  return `
  WITH session_durations AS (
    SELECT
      session_id,
      TIMESTAMP_SECONDS(MIN(event_time)) AS session_start_time,
      TIMESTAMP_SECONDS(MAX(event_time)) AS session_end_time,
    FROM
      ${datasetId}.${tableId}
    GROUP BY
      session_id
  )
  SELECT
    COUNT(DISTINCT user_id) AS total_users,
    DATE(TIMESTAMP_SECONDS(event_time)) AS date,
    COUNT(DISTINCT user_id) AS daily_active_user_count,
    COUNTIF(event_name = 'app_install') AS daily_new_users,
    AVG(TIMESTAMP_DIFF(session_end_time, session_start_time, MINUTE)) AS average_session_duration
  FROM
    ${datasetId}.${tableId}
  LEFT JOIN
    session_durations
  USING
    (session_id)
  GROUP BY
    date;
      `;
};

const publishData = withServiceErrorHandling(async (publishableData) => {
  const data = JSON.stringify(publishableData);
  const dataBuffer = Buffer.from(data);
  const messageId = await pubSubClient
    .topic(topicId)
    .publishMessage({ data: dataBuffer });

  return messageId;
});

const retrieveFromQuery = withServiceErrorHandling(async () => {
  const query = analyticsQuery(datasetId, tableId);
  const [result] = await bigqueryClient.query(query);
  return result;
});

module.exports = {
  publishData,
  retrieveFromQuery,
};
