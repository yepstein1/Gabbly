const qs = require('querystring')

exports.handler = async function (event, context) {

    let data = event.body;
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii')
    let output = qs.decode(text)
    let payload = qs.decode(output.Body)
    if (payload.pw == process.env.PASSWORD) {
        const msg = payload.msg
        const from = payload.from
        const lan = payload.lan
        const to = payload.to

        await sendMessage(from, msg, lan, to)


        return {
            statusCode: 200,

        }

    } else {

        /* await client.messages
             .create({
                 body: 'incorrect password',
                 from: '+13085366144',
                 to: payload.from
             });

         */

    }


}

function translate(text, language) {
    const axios = require('axios').default;
    const {v4: uuidv4} = require('uuid');
    const subscriptionKey = process.env.AZURE_SUB_KEY
    const endpoint = "https://api.cognitive.microsofttranslator.com";
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
            'to': language
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    });
}


sendMessage = async (from, msg, lan, to) => {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken);
    const message = ` From : ${from} \n ${msg}`
    const response = await translate(message, lan)
    const translatedText = await response.data[0].translations[0].text


    await client.messages
        .create({
            body: translatedText,
            from: '+13085366144',
            to: to
        }).catch((error) => {
            console.log(error)
        });

}
