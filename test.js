const config =require('dotenv');
config.config();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const  translate = function(word)
{
    var subscriptionKey = " 006f5766b52a4d06bf2a7a3acdd880f2"//process.env.A_SUB;
    var endpoint = "https://api.cognitive.microsofttranslator.com";

console.log(`word = ${word} type = ` + typeof word)

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
    const location = "eastus";

   return axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': ['es', 'it']
        },
        data: [{
           'text' : word
        }],
        responseType: 'json'
    });




}
module.exports = translate
