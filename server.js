import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import socketIo from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import passportConfig from './config/passport';
import socketsConfig from './config/sockets';
import routesConfig from './config/routes';

dotenv.config();

const serverPort = process.env.SERVER_PORT || 8000;
const app = express();
const server = http.createServer(app);
const MongoStore = connectMongo(session);
const sessionOptions = {
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: process.env.MONGO_URI }),
};

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDB Connected!'))
    .catch(error => console.error(error));

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session(sessionOptions));
app.use(express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((id, done) => {
    done(null, id);
});
passport.deserializeUser((id, done) => {
    done(null, id);
});
passportConfig();
routesConfig(app);
socketsConfig(socketIo(server));

server.listen(serverPort, () => {
    console.log(`Listening to http://localhost:${serverPort}`);
});
