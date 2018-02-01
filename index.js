/**
 * None of the npm packages I tried gave me well formatted json
 * so I tried making my own
 */
const convert = require('./csvtoprettyjson').convert

// make sure we have two args
if (process.argv.length !== 4) throw "Must be run with two parameters, input file and output file"
// call convert with input file and output file as args
convert(process.argv[2], process.argv[3])
