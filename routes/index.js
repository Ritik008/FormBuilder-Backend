const router = require('express').Router()
const authRoute = require('./auth.route')
const formRoute = require('./form.route')
const adminRoute = require('./admin.route')

const defaultRoutes = [
    {
      path: "/auth",
      route: authRoute,
    },
    {
      path: '/form',
      route: formRoute
    },
    {
      path: '/admin',
      route: adminRoute
    }
  ];
  
  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  module.exports = router;