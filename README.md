## Demo for apollo-cache-inmemory and IE 11 performance issues

### Install 
`npm install`

### Run 
`npm run demo`

### Description

What this example will show is a large graphql query result being
consumed by the client. The data is returned from a mock service
using the `json-server` module from npmjs.org. The actual data is
located in the file: `mock-graphql-server/mock-graphql-response.json`.


What to observe is how long compared to other browsers IE 11 takes to 
process the data and enter it into its cache. This dataset is just to 
give a decent example of the problem. Even when paging through records 
using a cursor, the processing of the subset of data will increase for 
each new request. It degrades consistently as the cache grows. It seems
that there is an extremely large amount of "subscriber notifications" 
that occur during the cache writes. You can seem more information at:

[https://stackoverflow.com/questions/50626652/apollo-inmemorycache-performance-strategies-for-large-data-set-react]
(https://stackoverflow.com/questions/50626652/apollo-inmemorycache-performance-strategies-for-large-data-set-react)


*Note: Even though the response shows a relay style cursor, the result
is not from a graphql server so changing the query will have no effect.
The project is also using the latest beta of the cache to demonstrate
the same issue appears as older versions. 



