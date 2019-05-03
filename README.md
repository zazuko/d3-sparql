# d3-sparql

This module lets you request data from [SPARQL](https://www.w3.org/TR/sparql11-query/) [endpoints](https://www.w3.org/wiki/SparqlEndpoints) in the vein of [d3-csv](https://github.com/d3/d3-dsv) and friends. It is generating a JSON structure from SPARQL query results, you can use that in any way you like in your code, with or without D3.

The access through a SPARQL endpoint allows a faster and more efficient data preparation (once you got [the hang of SPARQL and the RDF data model](https://www.youtube.com/watch?v=FvGndkpa4K0)). Ultimately it keeps visualizations up to date. Think of SPARQL endpoints as the most flexible API imaginable.

Define the SPARQL query and endpoint:

```js
// Author of Q3011087 (D3.js)
var mikeQuery = `SELECT ?developerName WHERE {
  wd:Q3011087 wdt:P178 ?developer.
  ?developer rdfs:label ?developerName.
  FILTER(LANG(?developerName) = 'en')
}`

wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
```

To query the endpoint and get the result:

```js
d3.sparql(wikidataUrl, mikeQuery).then((data) => {
  console.log(data); // [{'developerName': 'Mike Bostock'}]
})
```

More [examples](https://github.com/zazuko/d3-sparql/tree/master/examples) are provided in the [repository](https://github.com/zazuko/d3-sparql).

## Features

- Transformation of [XSD Datatypes](https://www.w3.org/2011/rdf-wg/wiki/XSD_Datatypes) (e.g. `xsd:dateTime`, `xsd:boolean`, ...) to native JavaScript types.
- Reformatting of the JSON Structure to a d3 style layout while using the provided variables names of the SPARQL Query.

## Limitations

- Only `SELECT` queries are supported. (This provides a projection of the graph data onto a table structure used by d3.)
- Currently only supports endpoints which are able to respond with `application/sparql-results+json`.

## Installing

Using NPM: `npm install d3-sparql`. You can also use a CDN, for instance <https://www.jsdelivr.com>.

See [CHANGELOG](CHANGELOG.md) for details about available versions.

## API Reference

This package add a [*sparql*](https://github.com/zazuko/d3-sparql/blob/master/README.md#sparql) function to the global `d3` object: `d3.sparql(endpoint, query, options = {})`.

<a name="request" href="#sparql">#</a> d3.<b> sparql </b>(<i>endpoint</i>, <i>query</i>[, <i>options = {}</i>]) [<>](https://github.com/zazuko/d3-sparql/blob/master/src/sparql.js#L5 "Source")

`options` is an optional object that will get merged with the second argument of [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

```js
d3.sparql(endpoint, query)
  .then((data) => …);
```

## Acknowledgement
The initial development of this library by [Zazuko](http://www.zazuko.com) was supported by the [City of Zürich](https://www.stadt-zuerich.ch/).
