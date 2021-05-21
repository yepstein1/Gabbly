const http = require('http');
const express = require('express');
const qs = require('querystring')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
 exports.handler = async function (event,context) {

   let  data = event.body;
   console.log(JSON.stringify(event))
    console.log(JSON.stringify(context))
    console.log("body" + data)
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii')

     let output = qs.decode(text)

  console.log('qs :'+JSON.stringify(output))









//console.log(JSON.parse(text))

    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken);


   await client.messages
        .create({
            body: output.Body,
            from: '+13085366144',
            to: '+18485251543'
        });




    return {
        statusCode:200,

    }








}
