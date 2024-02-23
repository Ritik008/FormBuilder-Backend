const csv = require('csv-parser');
const fs = require('fs');
const { stringify } = require("csv-stringify");


const utility = {}

utility.readFile = (filePath) => {
    const rows = []
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', () => {
            resolve(rows)
        });
    })  
}

utility.writeFile = (filePath, data, mode = 'w') => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFile(filePath, data.replace(/"/g, ''), {flag: mode}, err => {
        if (err) {
            reject(err)
        } else {
            resolve('Data Delete');
        }
    });
      resolve('Finished writing data')
    }catch(err) {
      reject(err)
    }    
  })
}

module.exports = {
    utility
}
