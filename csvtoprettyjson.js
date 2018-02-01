/**
 * Convert a csv file to pretty (tabulated) json
 * Convert takes path to input file, and output file as arguments
 * Only good for a single level of encapsulation
 */
module.exports = {
  convert: (inputFile, outputFile)=>{
    // require the filesystem core module
    const fs = require('fs')
    // require system specific line endings
    const endOfLine = require('os').EOL

    // the initial buffer used to read the csv file
    let buff = ''
    // the buffer that the json will be read into before being written to a file
    let jsonBuff = ''

    // read csv file as a stream
    fs.createReadStream(inputFile)
      // on data write chunks to buffer
      .on('data', (chunk)=>{
        buff += chunk
      })
      // on end continue to process csvs
      .on('end', ()=>{
        // break buffer into an array at newlines
        let lines = buff.split(endOfLine)
        // shift top line off the stack and split it into an array at the commas
        let headers = lines.shift().split(',')
        // write the initial square bracket and EOL to the json buffer
        jsonBuff += `[${endOfLine}`
        // iterate over lines
        lines.forEach((line, lineIndex)=>{
          // split the line into an array of values 
          let lineArray = line.split(',')
          // make sure we have all the values we're supposed to have
          if(lineArray.length === headers.length){
            // write a tab, a curly brace, and an EOL
            jsonBuff += `\t{${endOfLine}`
            // iterate over each of our values
            lineArray.forEach((item, index)=>{
              // add two tabs, a header and value in double quotes seperated by a colon
              jsonBuff += `\t\t"${headers[index]}": "${item}"`
              // on all but the last line end with a comma and an EOL, last line just gets an EOL
              jsonBuff += index < headers.length-1 ? `,${endOfLine}` : `${endOfLine}`
            })
            // we've written all of our values so terminate the json with a tab, curly brace, comma, and EOL
            // unless this is the last object, then omit the comma and add a square bracket and EOL on the new line
            jsonBuff += lineIndex === lines.length-2 ? `\t}${endOfLine}]${endOfLine}` : `\t},${endOfLine}`
          } else {
            // as long as it's not a blank last line, complain about a line with the wrong number of entries
            // do we stop at bad data? should i throw an error and quit here?
            // i decided to keep going and log irregularities
            if (lineIndex !== lines.length-1) console.log(`Entry #${lineIndex+1} is invalid. Moving on...`)
          }
        })
        // we're all out of lines. lets write the json buffer to the output file
        fs.writeFile(outputFile, jsonBuff, (err)=>{
          // complain
          if (err) throw err
          // inform of success prior to completion
          console.log(`Finished writing ${outputFile} to disk.`)
        })
      })
      // on error log error
      .on('error', (e)=>{
        console.log(e)
      })
  }
}