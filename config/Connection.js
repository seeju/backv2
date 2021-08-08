const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://julianafernandes:asdasd@cluster0.6iroq.mongodb.net/ones?retryWrites=true&w=majority'

const openConnection = () => mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

module.exports = {
    openConnection,
}
