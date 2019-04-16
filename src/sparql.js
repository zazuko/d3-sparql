import { request } from 'd3-request'

export default function (endpoint, query, callback) {
  var url = endpoint + '?query=' + encodeURIComponent(query)

  var sparql = request(url)
    .mimeType('application/sparql-results+json')
    .response(parseResponse)

  if (callback) {
    if (typeof callback !== 'function') {
      throw new Error('invalid callback: ' + callback)
    }

    sparql.get(callback)
    return
  }

  return sparql
};

var xmlSchema = 'http://www.w3.org/2001/XMLSchema#'

function parseResponse (xhr) {
  try {
    var body = JSON.parse(xhr.responseText)
  } catch (e) {
    throw new Error('unable to parse response, either the Endpoint URL is wrong or the Endpoint does not answer with sparql-results+json: ' + xhr.responseText)
  }
  return body.results.bindings.map(function (row) {
    var rowObject = {}
    Object.keys(row).forEach(function (column) {
      rowObject[column] = dataTypeToJS(row[column])
    })
    return rowObject
  })
}

function dataTypeToJS (value) {
  var v = value.value
  if (typeof value.datatype === 'string') {
    var dt = value.datatype.replace(xmlSchema, '')
    switch (dt) {
      case 'string':
        v = String(v); break
      case 'boolean':
        v = Boolean(v === 'false' ? false : v); break
      case 'float':
      case 'integer':
      case 'long':
      case 'double':
      case 'decimal':
      case 'nonPositiveInteger':
      case 'nonNegativeInteger':
      case 'negativeInteger':
      case 'int':
      case 'unsignedLong':
      case 'positiveInteger':
      case 'short':
      case 'unsignedInt':
      case 'byte':
      case 'unsignedShort':
      case 'unsignedByte':
        v = Number(v); break
      case 'date':
      case 'time':
      case 'dateTime':
        v = Date(v); break
    }
  }
  return v
}
