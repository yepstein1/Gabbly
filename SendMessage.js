const config=require('dotenv');
    config.config();

const accountSid = process.env.T_SID;
const authToken = process.env.T_AUTH;
const client = require('twilio')(accountSid, authToken);
const t= require("./test")
let wordToBeTranslated = process.argv.slice(2);

wordToBeTranslated = wordToBeTranslated.join(' ')


t(wordToBeTranslated).then( response =>{ let bob =JSON.stringify(response.data,0,1)



    let text =response.data[0].translations[0].text

console.log(text)
        client.messages
            .create({
                body: text,
                from: '+13085366144',
                to: '+19173960313'
            })
            .then(message => {
                    console.log(message.sid)

                }

            );


    }
)


    .catch((error) => {
        console.error('Error:', error);


    });



