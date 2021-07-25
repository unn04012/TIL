/**
 * const v1 = require('./routes/v1');
const passportConfig = require('./passport');
 */

import express from 'express';
import path from 'path';
import cookieParser  from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import passport from 'passport';

import Auth from './routes/Auth'; 
import Index from './routes/Index';

import App from './app';

import model from './models';


dotenv.config();




 model.sequelize.sync({ force: false })
      .then(() => {
        console.log('데이터베이스 연결 성공');
      })
      .catch((err) => {
        console.error(err);
 });

/**
 * DEFINE ROUTES
 * @OBJECT
 */
const routes = [
    new Auth(),
    new Index(),
]

/**
 * DEFINE MIDDLEWARES
 */

const middlewares = [
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({extended: false}),
    cookieParser(process.env.COOKIE_SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            }
    }),     
    passport.initialize(),
    passport.session(), 
]

/**
 * DEFINE SETTINGS FOR express().set
 */

const settings = [
  {key : 'port', value : process.env.PORT || 8002},
  {key : 'view engine', value : 'html'},
]

const appConfig = {
    routes : routes,
    middlewares : middlewares,
    settings : settings,
    port : process.env.PORT || 3000,
};

// CREATE SERVER
new App(appConfig).listen();