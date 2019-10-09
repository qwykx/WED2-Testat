import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes';

const app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));
export default app;
