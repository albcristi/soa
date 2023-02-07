const express = require('express');
const { PORT } = require("./config");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

const routes = require('./routes/routes');
routes(app);

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});
