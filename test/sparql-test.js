var tape = require("tape"),
    sparql = require("../");

var wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'

var catQuery = `#Cats
SELECT ?item ?itemLabel WHERE {
  ?item wdt:P31 wd:Q146.
  ?item rdfs:label ?itemLabel.
  FILTER(LANG(?itemLabel) = 'en')
}
`


tape("sparql(catQuery) returns what the internet was build for, obviously.", function(test) {
  sparql.sparql(catQuery).endpointUrl(wikidataUrl).get(function(error, json) {
    test.equal(json.results.bindings.length, 115);
  })
  test.end();
});
