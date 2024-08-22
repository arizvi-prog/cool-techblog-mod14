const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const { User, Post, Category } = require('./models');
const homeRoutes = require('./controllers/home-routes');
const dashboardRoutes = require('./controllers/dashboard-routes');
const apiRoutes = require('./controllers/api/category-routes');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api', apiRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
