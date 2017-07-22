import {request} from 'd3-request'

export default function (url, query, callback) {
  var url = url + '?query=' + encodeURIComponent(query)
  var response  = function (xhr) {
        var body = JSON.parse(xhr.responseText)
        return body.results.bindings.map(function(row) {
          var rowItem = {}
          Object.keys(row).forEach(function (key) {
            rowItem[key] = row[key].value
          })
          return rowItem
        })
      }

  var sparql = request(url).mimeType('application/sparql-results+json').response(response)

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return sparql.get(callback)
  }

  return sparql

};
