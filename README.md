# d3-sparql-v3

NOTE: This is the backport of [d3.sparql](https://github.com/zazuko/d3-sparql/) to be compatible to the version 3 of d3. Please refer to the [documentation](https://github.com/zazuko/d3-sparql/blob/master/README.md#api-reference) of the v4 module.

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

## Installing

Include [d3-sparql.js](https://github.com/zazuko/d3-sparql/blob/v3/d3-sparql.js) after d3 is loaded in your website.

```html
  <script src="d3.min.js"></script>
  <script src="d3-sparql.js"></script>
```


## Acknowledgement
The initial development of this library done by [Zazuko](http://www.zazuko.com) was sponsered by the [City of Zürich](https://www.stadt-zuerich.ch/).
