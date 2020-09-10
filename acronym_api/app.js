var cfg = require('./config.js');

var 
    express         = require('express'),
    bodyParser      = require('body-parser'),
    routes	        = require('./routes/routes.js'),
    mongoose        = require('mongoose'),
    helmet          = require('helmet'),
    jwt             = require('./controllers/jwt.controller');

mongoose.connect(cfg.urlMongo + cfg.bd_Mongo, {
    useNewUrlParser:true, 
    useFindAndModify: false,
    user:cfg.userMongo,
    pass:cfg.passMongo
});

mongoose.connection.on('error', function(err) {
    console.log(err)
    console.log('No se pudo conectar');
});

mongoose.connection.once('open', function() {
    console.log("Se ha conectado.");
})

var app = express()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));

app.use(helmet())

app.use(jwt())


app.use(function (err, req, res, next)
{
    console.log(err)
  if (err.name === 'UnauthorizedError')
  {
    res.status(403).send({msg:"UnauthorizedError", valid:false, status:403});
    return;
  }
});

//CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader("Access-Control-Allow-Headers", "Origin,Content-Range, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(routes)

app.listen(cfg.puerto, function() {
	console.log(cfg.puerto);
});