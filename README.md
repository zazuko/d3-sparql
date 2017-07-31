# d3-sparql

This module allows to access data from [SPARQL](https://www.w3.org/TR/sparql11-query/) [Endpoints](https://www.w3.org/wiki/SparqlEndpoints) in the vain of [d3-csv](https://github.com/d3/d3-dsv) and friends. This modules helps to make the data preparation step faster and more efficient (once you got the hang of SPARQL). Ultimately it makes it possible to keep your visualizations up-to-date without any further effort.

Define the SPARQL Query and Endpoint:
```js
#Author of Q3011087 (D3.js)
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

## Features

- Based on [d3-require](https://github.com/d3/d3-require) to be in-line with other d3 loagin code (and assure the same compatibility with browsers.)
- Transformation of [XSD Datatypes](https://www.w3.org/2011/rdf-wg/wiki/XSD_Datatypes) (e.g. `xsd:dateTime`, `xsd:boolean`, ...) to native JavaScript types.
- Reformating of the JSON Structure to a d3 style layout while using the provided variables names in the SPARQL Query.
- A backport to a d3 v3 library is provided.

## Limitations

- Only `SELECT` queries are supported. (This provides a projection of the graph data onto a table structure used by d3.)
- Currently only supports Endpoints which are able to respond with `application/sparql-results+json`.

## Installing

If you use NPM, `npm install d3-sparql`. Otherwise, download the [latest release](https://github.com/zazuko/d3-sparql/releases/latest).

## API Reference

YOUR API DOCUMENTATION HERE. Use bold for symbols (such as constructor and method names) and italics for instances. See the other D3 modules for examples.

<a href="#sparql" name="sparql">#</a> <b>sparql</b>()


## Acknowledgement
The initial development of this library was supported by the [City of Zürich](https://www.stadt-zuerich.ch/).
