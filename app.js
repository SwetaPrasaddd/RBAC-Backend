const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./ConfigureDB/configDB');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('', (req, res) => {
    res.send("Hello World!")
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
