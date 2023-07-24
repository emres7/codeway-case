
## Codeway Case Study

### How to run the code
Clone the project repository to your local machine

```
git clone https://github.com/emres7/codeway-case.git
```

Navigate to the project directory


```
cd src
```

Run the package dev script 

```
npm run dev
```


The application should now be running and accessible at http://localhost:3000. <be>

#### Design Choices
* Architecture
The project relies on GCP Pub/Sub and BigQuery subscription to publish logs to BigQuery directly. BigQuery Subscription fits cost and performance efficiency problems for this task as it utilizes BatchJob properties of BigQuery and we don't have post-processing for the retrieved logs as explained here/*https://cloud.google.com/pubsub/docs/create-bigquery-subscription#assign_bigquery_service_account*/embed link

* BigQuery
Data Columns:
type, session_id, event_name, event_time, page, country, region, city, user_id
Indexes:
CREATE SEARCH INDEX idx_user_id ON dataset.table (user_id)



#### Potential Improvements
Overall time limit was somewhat restrictive for me since this was my first time working with GCP. I spent most of my time to have a functional viable output so here is a discussion of potential improvements that I couldn't spent time as much as I desired.

* Partitioning and Clustering. In theory partitioning by event_time would decrease query time significantly because desired aggregation based on
groups by days. However with Pub/Sub I had hard time to
* Testing, Kubernetes, Deployment.

* To handle concurrency project uses @Transactional annotation to get, but using Locks (optimistic or pessimistic) or using threads may be a better solution for ensuring the reliability of operations.
* N

