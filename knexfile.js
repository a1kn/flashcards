require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'process.env.DB_URL',
      user:     'process.env.USER',
      password: 'process.env.PASSWORD'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: '/data/seeds',
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'process.env.DB_URL',
      user:     'process.env.USER',
      password: 'process.env.PASSWORD'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: '/data/seeds',
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'process.env.DB_URL',
      user:     'process.env.USER',
      password: 'process.env.PASSWORD'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: '/data/seeds',
    }
  }

};
