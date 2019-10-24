import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import session from 'express-session';
import {noteRoutes} from './routes/noteRoutes';

const app = express();
app.engine('hbs', hbs.express4({
    defaultLayout: 'views/layouts/default.hbs',
    layoutsDir: path.resolve('views/layouts/'),
}));

function setImportance(n, importance,_id, block, param, endTag) {
    const importanceTypes = ["*", "**", "***", "****", "*****"];
    var temp = '';
    for(var i = n - 1; i >= 0; --i)
    {
        var importanceType = "" + importanceTypes[i];
        temp += block.fn({index:i, importanceType:importanceType, id:_id});
        if(i == importance)
            temp = temp.replace(''+i+'" '+endTag+'', ''+i+'" '+param+ ''+endTag);
    }
    return temp;
}

hbs.registerHelper('for', function(n, block) {
    let counter = '';
    for(let i = 0; i < n; i++)
        counter += block.fn(i);
    return counter;
});
hbs.registerHelper('set_checked', function(n, importance,_id, block) {
    return setImportance(n, importance,_id, block, 'checked', '/>');
});

hbs.registerHelper('set_selected', function(n, importance,_id, block) {
    return setImportance(n, importance,_id, block, 'selected', '>');
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a === b) {
        return opts.fn(this);
    }
    return opts.inverse(this);
});
app.set('view engine', 'hbs');
app.use(session({secret: 'sadkjlfasdlkfjlasödfjadl', resave: false, saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));
export default app;
