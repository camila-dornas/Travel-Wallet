require('dotenv').config();
const express = require('express');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const walletRouter = require('./walletRouter');
const error = require('../../middlewares/error');
const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/wallet', walletRouter );


app.use(error);

const port = process.env.PORT || 3001;

app.listen(port);
console.log(`Api rodando na porta ${port}`);

module.exports = app;
