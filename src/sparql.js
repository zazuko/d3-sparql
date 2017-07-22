import d3Request from 'd3-request'
import SparqlHttp from 'sparql-http-client'

export default function (query, callback) {
  var sparql,
      endpointUrl

  // Wrap d3-request in a fetch promise
  SparqlHttp.fetch = function (url, options) {
    return new Promise(function (resolve, reject) {
      const request = d3Request.request(url)

      // Set headers
      for (var key in options.headers) { request.header(key, options.headers[key]) }

      // Send
      request
        .on('error', function (error) { reject(error) })
        .on('load', function (xhr) { resolve({text: function () { return xhr.responseText }}) })
        .send(options.method || 'GET', options.body)
    })
  }

  var endpoint = new SparqlHttp({endpointUrl: '/query'})

  sparql = {
    endpointUrl: function(value) {
      if (!arguments.length) return endpointUrl;
      endpointUrl = value == null ? null : value + "";
      endpoint.endpointUrl = endpointUrl
      return sparql;
    },
    get: function (callback) {
     endpoint.selectQuery(query).then(function (res) {
        return res.text()
      }).then(function (body) {
        var body = JSON.parse(body)
        var data = body.results.bindings.map(function(row) {
          var rowItem = {}
          Object.keys(row).forEach(function (key) {
            rowItem[key] = row[key].value
          })
          return rowItem
        })
        callback(null, data)
      }).catch(function (error) {
        callback(error, null)
      })
    }
  }

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return sparql.get(callback)
  }

  return sparql

};
