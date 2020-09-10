var express       = require('express')
var ACRONYM       = require('../controllers/acronym.controller')


var app = express.Router()

app.get("/", function(req, res, next) {

  res.status(200).send({info:"ACRONYM API"})
  
});

var baseurl = '/'

//API 
app.post (baseurl + 'acronym',                                                            ACRONYM.addAcronym)
app.put (baseurl + 'acronym/:acronym',                                                    ACRONYM.editAcronym)
app.get (baseurl + 'random/:count',                                                       ACRONYM.getRandomAcronyms)
app.get (baseurl + 'acronym',                                                             ACRONYM.listAcronyms)
app.get (baseurl + 'acronym/:acronym',                                                    ACRONYM.getAcronym)
app.delete (baseurl + 'acronym/:acronym',                                                  ACRONYM.deleteAcronym)

/***SOLO POR TESTING */
app.get (baseurl + 'token',                                                               ACRONYM.getTokenTest)


module.exports = app;