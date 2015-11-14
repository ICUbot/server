
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , Twit = require('twit')
  , fs = require('fs');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/intruder', function(req, res){
  // auth keys
  var T = new Twit({
      consumer_key:         '7NcliyXkErrRqXaPkJU84jEQn'
    , consumer_secret:      '1Q2KcBfhbw4xUuTqvAre2GBXT0OYhd3lIZa0wmuDR7Nie8fKgs'
    , access_token:         '622419647-a60CFvSpdbjyGV0JjcqZL6EX4s6vMi8oNI9SLoKm'
    , access_token_secret:  'kemKmdVFRK1Bm34cO6c55pMjv5BELj4sa2Ooznrjr8ieE'
  });

  // image encoding
  var b64content = fs.readFileSync('public/imgs/image.png', { encoding: 'base64' })

  // first we must post the media to Twitter
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: 'intruder', media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
      if (!err && response.statusCode == 200) {
        res.render('intruder', { title: 'Intruder' });
      }
      else {
        response.send(err);
      }
    })
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
