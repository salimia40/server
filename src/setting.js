const redis = require("redis");

const def = {
    quotation: 1800,
    tolerence: 5,
    delay: 60,
    code: 100000,
    commition: 10,
    baseCharge: 1150,
    vipOff: 50,
    active: 0, // boolean
    showFacts: 0, // boolean
    cashReq: 0, // boolean
}

const client = redis.createClient({ url: process.env.REDIS_URL_SETTING })
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

const Setting = function () {
    this.values = {
        quotation: 'quotation',
        tolerence: 'tolerence',
        delay: 'delay',
        code: 'code',
        commition: 'commition',
        baseCharge: 'baseCharge',
        vipOff: 'vipOff',
        active: 'active', // boolean
        showFacts: 'showFacts', // boolean
        cashReq: 'cashReq' // boolean
    }
    for (const key in def) {
        if (def.hasOwnProperty(key)) {
            const element = def[key];

            client.exists(key, function (err, reply) {
                if (reply !== 1)
                    client.set(key, String(Number(element)))
            })
        }
    }

    this.getValue = async function (key) {
        var val = await getAsync(key)
        if (def[key] == 0)
            return Boolean(Number(val))
        return Number(val)
    }
    this.setValue = function (key, val) {
        client.set(key, String(Number(val)))
    }

    this.getString = async function (key) {
        var val = await getAsync(key)
        return val
    }

    this.setString = function (key, val) {
        client.set(key, val)
    }

}

module.exports = new Setting()