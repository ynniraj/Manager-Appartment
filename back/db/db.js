const mongooose = require('mongoose');

module.exports = () => {
    return mongooose.connect("mongodb+srv://ynniraj:ynniraj@cluster0.w8jir.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
}