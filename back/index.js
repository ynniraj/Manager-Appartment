const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());
const connect = require('./db/db');

const { register, login } = require('./controllers/user.controller')
const { flatregister, getflats, getbyidflat, getFlatspagination, highsortedflat, lowsortedflat, blockname, byflattype } = require('./controllers/flat.controller')
const { residents } = require('./controllers/resident.controller')

app.post("/register", register)
app.post("/login", login)
app.post("/flatregister", flatregister)
app.get("/getflats", getflats)
app.post("/residents", residents)
app.get("/getbyidflat/:id", getbyidflat)
app.get("/getFlatspagination", getFlatspagination)
app.get("/highsortedflat", highsortedflat)
app.get("/lowsortedflat", lowsortedflat)
app.get("/blockname/:name", blockname)
app.get("/byflattype/:name", byflattype)



app.listen(process.env.PORT || 8080, async () => {
    try {
        await connect()
        console.log("server is running on port 8080");
    }
    catch (e) {
        console.log(e)
    }
})
