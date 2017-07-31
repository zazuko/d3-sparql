d3.sparql = function (url, query, callback) {
  var url = url + '?query=' + encodeURIComponent(query)

  var response  = function (xhr) {
        var body = JSON.parse(xhr.responseText)
        return body.results.bindings.map(function(row) {
          var rowObject = {}
          Object.keys(row).forEach(function (column) {
            rowObject[column] = row[column].value
          })
          return rowObject
        })
      }

  var sparql = d3.xhr(url, 'application/sparql-results+json').response(response)

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return sparql.get(callback)
  }

  return sparql

};
