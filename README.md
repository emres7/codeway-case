
# Codeway Case Study

## How to run the code
You can build the project with a docker image or by running locally.
### Running Docker Image
Pull the docker Image of the code

```
docker pull emres8/codeway-case:v2
```

Run the Image
```
docker run -p 3000:3000 -d emres8/codeway-case:v2
```

The application should now be running and accessible at http://localhost:3000. <br/>

### Running Locally

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
npm run start
```

The application should now be running and accessible at http://localhost:3000. <br/>

## API Documentation
Use the following link: https://documenter.getpostman.com/view/14655448/2s9Xxtxb4U

## Design 
### Architecture
The project relies on a GCP Pub/Sub BigQuery subscription to publish logs to BigQuery directly. BigQuery Subscription fits cost and performance efficiency problems for this task as it utilizes BatchJob properties of BigQuery and we don't have post-processing for the retrieved logs as explained [here](https://cloud.google.com/pubsub/docs/create-bigquery-subscription#assign_bigquery_service_account)

### BigQuery Table
- Schema:
type, session_id, event_name, event_time, page, country, region, city, user_id
- Indexes:
CREATE SEARCH INDEX idx_user_id ON dataset.table (user_id)



### Potential Improvements
This was my first time working with GCP so I spent a significant amount of time to make the system function. So here is a discussion of potential improvements that could be made.
<br/>
<br/>
- Partitioning and Clustering. Partitioning by event_time would decrease query time significantly because the desired aggregation is based on groups by days. With BigQuery I was not able to add such functionality.
- Testing, Kubernetes, Deployment. These phases could have been implemented.
<br/>



