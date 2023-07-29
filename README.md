
## Codeway Case Study

### How to run the code
#### Running Docker Image
Pull the docker Image of the code

```
docker pull emres8/codeway-case:v2
```

Run the Image
```
docker run -p 3000:3000 -d emres8/codeway-case:v2
```

The application should now be running and accessible at http://localhost:3000. <br/>

#### Running Locally

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


### Usage 
#### Retrieving JWT Token
First retrieve JWT token <br/>
For the sake of simplicity registration is not implemented. Instead use predefined dummy username and password given in below request.

```
curl -X POST -H "Content-Type: application/json" -d '{"username": "codeway", "password": "codeway123"}' http://localhost:3000/login
```

Response will contain generated JWT Token <br/>

In order to access other requests of the app use generated JWT token similar to below example
```
curl -H "authorization: your-generated-jwt-token" http://localhost:3000/api/v2/logs/analytics
```

#### Available Requests
* GET:  /logs/analytics <br/>
<br/>
No parameters <br/>
Returns analytics <br/>
<br/>
* POST: /logs/publish <br/>
<br/>
Params : 
"type": str, required <br/>
"session_id": str, required <br/>
"event_name": str, required <br/>
"page": str, required <br/>
"event_time": timestamp, required <br/>
"country": str, required <br/>
"region": str, required <br/>
"city": str, required <br/>
"user_id": str, required <br/>
Saves given log to database <br/>

### Design Choices
* Architecture
<br/>
The project relies on GCP Pub/Sub and BigQuery subscription to publish logs to BigQuery directly. BigQuery Subscription fits cost and performance efficiency problems for this task as it utilizes BatchJob properties of BigQuery and we don't have post-processing for the retrieved logs as explained [here](https://cloud.google.com/pubsub/docs/create-bigquery-subscription#assign_bigquery_service_account)

* BigQuery
<br/>
Data Columns:
<br/>
type, session_id, event_name, event_time, page, country, region, city, user_id
<br/>
Indexes:
<br/>
CREATE SEARCH INDEX idx_user_id ON dataset.table (user_id)



### Potential Improvements
Overall time limit was somewhat restrictive for me since this was my first time working with GCP. I spent most of my time to have a functional viable output so here is a discussion of potential improvements that I couldn't spent time as much as I desired.

* Partitioning and Clustering. 
<br/>
In theory partitioning by event_time would decrease query time significantly because desired aggregation based on groups by days. With BigQuery I was not able to add such functionality.

* Testing, Kubernetes, Deployment.
<br/>



