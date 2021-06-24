require('dotenv').config({path: require('find-config')('.env')})
module.exports = async function hasAccess(number) {
    console.log(number)
    const {Pool} = require('pg')
    // your server-side functionality
    console.log("hello world")

    const pool = new Pool({
        user: 'postgres'
        ,
        host: process.env.HOST,
        database: process.env.DATA_BASE,
        password: process.env.PG_PASSWORD
        ,
        port: 5432,
    })
    //client.connect()
    try {

        const res = await pool.query(`select public.isauthnum($1)`, [number]).rows[0].isauthnum
        //let result =  await res
        console.log("end of postgres query" + res)

        return res

    } catch (err) {
        console.log(err)
    }
}
//a(9173960313).then(res => console.log(res))
