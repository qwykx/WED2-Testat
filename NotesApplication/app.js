import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import session from 'express-session';
import {noteRoutes} from './routes/noteRoutes';

const app = express();
app.engine('hbs', hbs.express4({
    defaultLayout: 'views/layouts/default',
    layoutsDir: path.resolve('views/layouts/'),
}));
hbs.registerHelper('for', function(n, block) {
    let counter = '';
    for(let i = 0; i < n; i++)
        counter += block.fn(i);
    return counter;
});
app.set('view engine', 'hbs');
app.use(session({secret: 'sadkjlfasdlkfjlasödfjadl', resave: false, saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));
export default app;
