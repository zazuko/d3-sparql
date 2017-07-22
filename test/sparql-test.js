var tape = require("tape"),
    sparql = require("../");

var wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'

var mikeQuery = `#D3.js Author
SELECT ?developerName WHERE {
  wd:Q3011087 wdt:P178 ?developer.
  ?developer rdfs:label ?developerName.
  FILTER(LANG(?developerName) = 'en')
}
`
var catQuery = `#Cats
SELECT ?item ?itemLabel WHERE {
  ?item wdt:P31 wd:Q146.
  ?item rdfs:label ?itemLabel.
  FILTER(LANG(?itemLabel) = 'en')
}
`

tape("sparql(wikidataUrl, mikeQuery) returns the developer of D3.js", function(test) {
  sparql.sparql(wikidataUrl, mikeQuery, function(error, data) {
    console.log(error, data)
    test.equal(data[0].developerName, 'Mike Bostock');
  })
  test.end();
});

tape("sparql(wikidataUrl, catQuery) returns what the internet was build for, obviously.", function(test) {
  sparql.sparql(wikidataUrl, catQuery, function(error, data) {
    test.equal(data.length, 115);
  })
  test.end();
});
