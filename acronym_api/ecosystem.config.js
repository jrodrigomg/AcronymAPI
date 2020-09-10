module.exports = {
  apps : [{
    name: 'AC_API',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development',
      "TZ": "America/Guatemala",
      PORT:               3002,
      URLMONGO:           'URLMONGO',
      USER_MONGO:         'USER',
      PASS_MONGO:         'PASS',
      BD_MONGO:           'DB',
      secret_jwt_key:     'SECRETJWT',
      expiredTime:        50000 
    
    }
  }],
};
