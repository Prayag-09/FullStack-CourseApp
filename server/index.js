const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());
const port = process.env.PORT;

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("/", (req, res) => res.json({msg: "Hello World after the class"}));

mongoose.connect(process.env.MONGO_URL)
.then(() => {
        console.log('Connected to MongoDB')
    })
.catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.listen(port, () => {
    console.log(`Server is up @ http://localhost:${port} `)
})