'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        '0.0.0.0',
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME
  },
  google: {
    secret: process.env.GOOGLE_SECRET
  },
  twilio: {
    auth: process.env.TWILIO_AUTH
  },
  url: {
    url: 'http://newremindzo.herokuapp.com/'
  }
};