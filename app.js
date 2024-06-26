require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const shirtsRouter = require('./controllers/shirts');
const salesRouter = require('./controllers/sales');
const { MONGO_URI } = require('./config');



(async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// rutas FE
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/store', express.static(path.resolve('views', 'store')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/images', express.static(path.resolve('img')));



// Rustas BE
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/shirts', userExtractor, shirtsRouter);
app.use('/api/sales', userExtractor, salesRouter);

app.use(morgan('tiny'));



module.exports = app;


