# d3-sparql

This module allows to access data from [SPARQL](https://www.w3.org/TR/sparql11-query/) [Endpoints](https://www.w3.org/wiki/SparqlEndpoints) in the vein of [d3-csv](https://github.com/d3/d3-dsv) and friends. The access through a SPARQL Endpoint allows a faster and more efficient data preparation (, once you got [the hang of SPARQL and the RDF data model](https://www.youtube.com/watch?v=FvGndkpa4K0)). Ultimately it keeps visualizations up to date. Think of SPARQL Endpoints as the most flexible API immaginable.

Define the SPARQL Query and Endpoint:

```js
// Author of Q3011087 (D3.js)
var mikeQuery = `SELECT ?developerName WHERE {
  wd:Q3011087 wdt:P178 ?developer.
  ?developer rdfs:label ?developerName.
  FILTER(LANG(?developerName) = 'en')
}
wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
```

To query the Endpoint and return the result in a d3 ready data format:

```js
d3.sparql(wikidataUrl, mikeQuery, function(error, data) {
  if (error) throw error;
  console.log(data); // [{'developerName': 'Mike Bostock'}]
})
```

More [examples](https://github.com/zazuko/d3-sparql/tree/master/examples) are provided in the [repository](https://github.com/zazuko/d3-sparql).

## Features

- Based on [d3-require](https://github.com/d3/d3-require) to be in-line with other d3 request code (and assure the same compatibility with browsers.)
- Transformation of [XSD Datatypes](https://www.w3.org/2011/rdf-wg/wiki/XSD_Datatypes) (e.g. `xsd:dateTime`, `xsd:boolean`, ...) to native JavaScript types.
- Reformating of the JSON Structure to a d3 style layout while using the provided variables names of the SPARQL Query.
- A backport to a d3 v3 implementation is [provided](https://github.com/zazuko/d3-sparql/tree/v3).

## Limitations

- Only `SELECT` queries are supported. (This provides a projection of the graph data onto a table structure used by d3.)
- Currently only supports Endpoints which are able to respond with `application/sparql-results+json`.
- Only `GET` requests can be issued in the current version.

## Installing

If you use NPM, `npm install d3-sparql`. Otherwise, download the [latest release](https://github.com/zazuko/d3-sparql/releases/latest).

## API Reference

The *sparql* request is based on a [*d3.request*](https://github.com/d3/d3-request/blob/master/README.md#request). It implements the [*sparql*](https://github.com/zazuko/d3-sparql/blob/master/README.md#sparql) function and sets an according [*request*.response](https://github.com/d3/d3-request/blob/master/README.md#request_response) which processes the response of the SPARQL endpoint.

<a name="request" href="#sparql">#</a> d3.<b> sparql </b>(<i>endpoint</i>, <i>query</i>[, <i>callback</i>]) [<>](https://github.com/zazuko/d3-sparql/blob/master/src/sparql.js#L5 "Source")

Returns a new *sparql* request for the specified SPARQL *endpoint* with the specified SPARQL *query*. If no *callback* is specified, the returned *sparql* request is not yet issued and can be further configured. If a callback is specified, it is equivalent to calling sparql.get immediately after construction:

```js
d3.sparql(endpoint, query)
    .get(callback);
```

All other [*request*](https://github.com/d3/d3-request/blob/master/README.md) functions can be used as specified to influence the final request (, except [*request*.response](https://github.com/d3/d3-request/blob/master/README.md#request_response), [*request*. mimeType](https://github.com/d3/d3-request/blob/master/README.md#request_mimeType) should not be changed, unless you know what you do, to assure correct working of the [*sparql*](https://github.com/zazuko/d3-sparql/blob/master/README.md#sparql) request).

## Acknowledgement
The initial development of this library by [Zazuko](http://www.zazuko.com) was sponsered by the [City of Zürich](https://www.stadt-zuerich.ch/).
