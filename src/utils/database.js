const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.plugin(require('mongoose-autopopulate'))