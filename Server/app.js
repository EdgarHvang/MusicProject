const express = require("express");
const routes = require('./routers');
const cors = require('cors');


require('./config/data.config').setUpData();

const app = express();

app.use(cors());
// console.log(cors());
app.use(express.json());
// app.use(express.urlencoded);

app.use(routes);

app.use((req, res, next) => {
    res.status(404).json({
        error: req.url + 'API not supported'
    })
})

app.use((error, req, res, next) => {
    if (error.message === 'NOT found') {
        res.status(404).json({ error: error.message });
    } else {
        res.status(500).json({
            error: 'something is wrong! Try later'
        })
    }
});

app.set('port',process.env.PORT || 3000);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Express app listening on port', server.address().port);
});