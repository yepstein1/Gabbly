const qs = require('querystring')
const translate = require('./translate')
const hasAccess = require('./hasAccess')
require('dotenv').config({path: require('find-config')('.env')})
/*const bob = */
exports.handler = async function (event, context) {
//const num=9173960313
    let allow;
    let HasAx;
    let data = event.body;
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii')
    let output = qs.decode(text)
    console.log(`output ${JSON.stringify(output)}`)
    let payload = qs.decode(output.Body)
    try {
        allow = await hasAccess(output.From);
        allow.then(res => {
            console.log(res)
            HasAx = res;
        })
    } catch (e) {
        console.log(e)
    }

    if (payload.pw == process.env.PASSWORD || HasAx) {
        const msg = payload.msg
        // const from = payload.from
        const lan = payload.lan
        const to = payload.to

        await sendMessage(output.From, msg, lan, to)


        /*  await sendMessage(+19173960313,"hi", "he",+1913960313)
       */
        return {
            statusCode: 200,

        }

    } else {
        console.log("else : no access")
    }

    /* await client.messages
         .create({
             body: 'incorrect password',
             from: '+13085366144',
             to: payload.from
         });

*/

    }


sendMessage = async (from, msg, lan, to) => {
    let errorMessage;
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN
    console.log(accountSid)
    const client = require('twilio')(accountSid, authToken);
    const message = ` From : ${from} \n ${msg}`

    async function sendError(text) {
        console.log(`hi from begining of sendError`)
        console.log(`in send error what is from: ${from}`)
        //from = "+" + from
        try {
            const messageInfo = await client.messages
                .create({
                        body: text,
                        from: '+13085366144',
                        to: from
                    }
                );

            console.log(` error message result: ${JSON.stringify(messageInfo)}`)
        } catch (err) {
            console.log(` i send error :${err}`)
        }


    }


    const response = await translate(message, lan).catch(error => {

        console.log("hi from azure error")
        //  sendError()
        console.log(error)

    });
    if (response != undefined) {

        let translatedText = await response
            .data[0].translations[0].text;


        const res = await client.messages
            .create({
                body: translatedText,
                from: '+13085366144',
                to: to
            }).catch((error) => {
                console.log(error)
                errorMessage = error
                // console.log("error in send message")

            });
        console.log(`res in send regular message: ${JSON.stringify(res)}`)
        console.log(`em: ${errorMessage}`)
        if (res === undefined) {
            await sendError("incorrect message format" + errorMessage)
            //  console.log(`result in error : ${result}`)
        }


    } else {
        //console.log("hi from else")
        await sendError("incorrect language input")
    }


}


/*bob().then().catch(err=> console.log(err))*/



