const express = require('express');
const app = express();
const storage = require('node-persist');
const products = require("./utils");
const cors = require('cors');

app.use(cors({origin: "*"}));
app.use(express.json());

storage.init().then(() => {
        storage.updateItem('products', JSON.stringify(products));
        console.log('Products loaded...');
    }
);

const routes = require('./routes/routes');
const {PORT} = require("./config");
routes(app);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
