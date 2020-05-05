module.exports = {
  apps:[{
    name: 'testing_dev',
    script: 'index.js',
    autorestart: false,
    env:{
      NODE_ENV: 'dev'
    },
    env_staging:{
      NODE_ENV: 'staging'
    },
    env_prod:{
      NODE_ENV: 'prod'
    }
  }]
}