const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors())


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))