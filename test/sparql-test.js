var tape = require('tape')

var sparql = require('../')

// endpoint vendor: blazegraph
var wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
// endpoint vendor: stardog
var adminUrl = 'http://data.admin.ch/query'
// endpoint vendor: virtuoso
var ldgeoadminUrl = 'https://ld.geo.admin.ch/query'

//* ******
var mikeQuery = `#D3.js Author
SELECT ?developerName WHERE {
  wd:Q3011087 wdt:P178 ?developer.
  ?developer rdfs:label ?developerName.
  FILTER(LANG(?developerName) = 'en')
}
`

tape('Simple Query returns the developer of D3.js [Blazegraph] [https]', function (test) {
  sparql.sparql(wikidataUrl, mikeQuery, function (error, data) {
    test.equal(data[0].developerName, 'Mike Bostock')
    test.error(error)
  })
  test.end()
})

//* ******
var swissMuniQuery = `SELECT ?id ?name ?canton WHERE {
  ?municipality a <https://gont.ch/MunicipalityVersion>.
  ?municipality <https://gont.ch/id> ?id.
  ?municipality <https://gont.ch/longName> ?name.
  ?municipality <https://gont.ch/canton> ?cantonIri.
  ?cantonIri <https://gont.ch/longName> ?canton.
} ORDER BY ?id`

tape('Larger response [Stardog] [http]', function (test) {
  sparql.sparql(adminUrl, swissMuniQuery, function (error, data) {
    test.deepEqual(data[0].id, Number(10001))
    test.error(error)
  })
  test.end()
})

//* ******
var swissCantonsQuery = `SELECT ?Canton ?CantonName
WHERE {
  ?Canton <http://www.geonames.org/ontology#featureCode> <http://www.geonames.org/ontology#A.ADM1> .
  ?Canton a <http://schema.org/AdministrativeArea> .
  ?Canton <http://schema.org/name> ?CantonName .
}`

tape('Query with known amount of results [Virtuoso] [https]', function (test) {
  sparql.sparql(ldgeoadminUrl, swissCantonsQuery, function (error, data) {
    test.equal(data.length, 26)
    test.equal(error, null)
  })
  test.end()
})

//* ******
// Errors

tape('Existing domain, not a SPARQL Endpoint.', function (test) {
  sparql.sparql('http://example.com', mikeQuery, function (error, data) {
    test.equal(data, undefined)
    test.equal(error !== null, true)
  })
  test.end()
})

tape('Non-existing domain.', function (test) {
  sparql.sparql('http://notexisting.example.com', mikeQuery, function (error, data) {
    test.equal(data, undefined)
    test.equal(error !== null, true)
  })
  test.end()
})

tape('Syntax error in SPARQL Query.', function (test) {
  sparql.sparql(wikidataUrl, 'SELECT * WHERE {s?s ?p ?o.} LIMIT 10').get(function (error, data) {
    test.equal(data, undefined)
    test.equal(error !== null, true)
  })
  test.end()
})
