const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const getProfileRoute = require('./routes/getProfile');
const loginRoute = require('./routes/login');

const app = express();
app.use(express.json());
app.use(cors());

const dbUrl = "mongodb+srv://tamilarasan:Tamil102002%23@cluster3.zlhsged.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.info("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((e) => {
        console.log("Error While connecting to database:", e);
    });

app.use('/register', registerRoute);
app.use('/profile', profileRoute);
app.use('/getProfile', getProfileRoute);
app.use('/login', loginRoute);

app.listen(3005, () => {
    console.log("Server is running on port 3005");
});
