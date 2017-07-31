require('shelljs/global')

rm('sparql.js')
exec('git show master:src/sparql.js > sparql.js')

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

sed('-i', "import {request} from 'd3-request'",'', 'sparql.js')
sed('-i', "export default function",'d3.sparql = function', 'sparql.js')
sed('-i', escapeRegExp("dataTypeCasting(row[column])"),'d3.sparql.dataTypeCasting(row[column])', 'sparql.js')
sed('-i', escapeRegExp('request(url).mimeType('),"d3.xhr(url,", 'sparql.js')
sed('-i', escapeRegExp("export function dataTypeCasting(value)"),"d3.sparql.dataTypeCasting = function (value)", 'sparql.js')

cp('sparql.js', 'd3-sparql.js')
rm('sparql.js')
