const connectToMongo = require("./db");
const cors = require('cors');
const express = require("express");
connectToMongo();
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// TO FETCH THE BODY DETAILS IN GET REQUEST
app.use(cors())
app.use(express.json())
// AVAILABLE ROUTES
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// app.get("/api/v1/login", (req, res) => {
//     res.send("Hello Login!");
// });
// app.get("/api/v1/signup", (req, res) => {
//     res.send("Hello Signup!");
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
