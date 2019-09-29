const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const mainRouter = require('./mainRouter')
const userRouter = require('./userRouter')
app.use('/', mainRouter)
app.use('/user', userRouter)



app.use('/admin', mainRouter)

// Give each route a router
// /movie
// /movie/search
// /person/search
// /person/cast
// /tv/search
// ...

app.listen(3000);
