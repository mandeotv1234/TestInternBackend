const userRouter = require('./user');
const adminRouter = require('./admin');

function route(app) {
  app.use('/users', userRouter);
  app.use('/admin', adminRouter);
}

module.exports = route;
