
const axios = require('axios').default;
const fs = require('fs');

let rawdata = fs.readFileSync('gistfile2.json');
let acronyms = JSON.parse(rawdata);


//Importacion
for (let i=0; i< acronyms.length; i++)
{
    let acronym_value= acronyms[i];
    let acronym = Object.entries(acronym_value)[0]
    let name = acronym[0] + "";
    let description = acronym[1];
    axios.post('http://localhost:3002/acronym', {
        name: name +"",
        description:description + ""
    })
    .then(function (response) {
        console.log("success")
    })
    .catch(function (error) {
        console.log("fail")
    });

}






