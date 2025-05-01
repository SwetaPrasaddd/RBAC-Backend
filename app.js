const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./ConfigureDB/configDB');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '5mb' }));         // For JSON payloads
app.use(express.urlencoded({ limit: '5mb', extended: true }));


app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/blogs', require('./Routes/blogRoutes'));

const PORT = process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
