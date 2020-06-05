//1155126854 Yeung Man Wai

const express = require('express');
const app = express();

app.use(express.static('directory'));

app.listen(3000, () => console.log("connected"));