const app = require('express')();
const next = require('next');

const middleware = require('./middleware');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

nextApp
  .prepare()
  .then(() => {
    app.use(middleware.morgan('dev'));
    app.use(middleware.bodyParser.json());
    app.use(middleware.bodyParser.urlencoded({ extended: true }));
    app.use(middleware.auth.session);
    app.use(middleware.passport.initialize());
    app.use(middleware.passport.session());

    // pages endpoint
    app.get('/', (req, res) => routes.pages.index(req, res, nextApp));
    app.get('/settings', (req, res) => routes.pages.settings(req, res, nextApp));
    app.get('/signin', (req, res) => routes.pages.signin(req, res, nextApp));
    app.get('/signout', routes.pages.signout);

    // data endpoint
    app.use('/auth', routes.auth);
    app.use('/api/menu', routes.menu);
    app.use('/api/order', middleware.auth.verify, routes.order);

    // 404 not found
    app.get('*', nextHandler);

    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(err => console.log(err));