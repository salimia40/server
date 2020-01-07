// const toString = (val) => { console.log(String(Number(val))) }
// const toNumber = (val) => { console.log(Number(val)) }
// const toBoolian = (val) => { console.log(Boolean(Number(val))) }

// const setting = require('./src/setting')

// const getValue = async (key) => console.info(await setting.getValue(key))

// getValue(setting.values.vipOff)
// getValue(setting.values.tolerence)
// getValue(setting.values.active)
// setting.setValue('active', false)
// toBoolian('0')

var id = '5dff7b48d52c8119b1c3c7a7'
require('./src/utils/database')
const dealUtils = require('./src/utils/dealUtils')

dealUtils.getMaxAvalableDeal(id)