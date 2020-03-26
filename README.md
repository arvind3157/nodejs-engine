# nodejs-engine

This service addresses first 2 tasks.
1. Create service to search the text
2. Create Rest API to query using endpoint

# Steps to to setup

1. Clone the repository
2. Navigate inside project repository
3. npm i
4. npm start

Server is ready to serve on port 3001.

Endpoint: POST http://localhost:3001/search

Body:

```
{
    "key":"the problem is",
    "k":5
}
