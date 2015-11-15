
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


app.post('/image', function(req, res) {
    /*
    fs.readFile(req.files.file.path, function (err, data){
        var dirname = "/public/imgs";
        var newPath = dirname + "/uploads/" + "image";
        fs.writeFile(newPath, data, function (err) {
        if(err){
                res.json({'response':"Error"});
            } else {
                res.json({'response':"Saved"});
            }
        });
    });
*/
});
 
 
app.get('/image/:file', function (req, res){
        file = req.params.file;
        var dirname = "/public/imgs";
        var img = fs.readFileSync(dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
});

app.get('/intruder', function(req, res){
  // auth keys
  var T = new Twit({
      consumer_key:         'i16nHoJ8SFsgbVJEPxle24jgS'
    , consumer_secret:      'Ke18Hs8BaC4N1zMBhLlcRnxGYXWpGQ6SsbJ0A7WFfHs12ehN5y'
    , access_token:         '4188246705-BIpbm5o0tCe5uejZeSkcwoeBew86Teoy2Op4bpH'
    , access_token_secret:  'NdVwoXm5o50wvCbI5Tkvf6ItqR6VAtwX7s5wIdQiuuCJL'
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

app.get('/captured', function(req, res){
  // auth keys
  var T = new Twit({
      consumer_key:         'i16nHoJ8SFsgbVJEPxle24jgS'
    , consumer_secret:      'Ke18Hs8BaC4N1zMBhLlcRnxGYXWpGQ6SsbJ0A7WFfHs12ehN5y'
    , access_token:         '4188246705-BIpbm5o0tCe5uejZeSkcwoeBew86Teoy2Op4bpH'
    , access_token_secret:  'NdVwoXm5o50wvCbI5Tkvf6ItqR6VAtwX7s5wIdQiuuCJL'
  });

  // image encoding
  var b64content = fs.readFileSync('public/imgs/image.png', { encoding: 'base64' })

  // first we must post the media to Twitter
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: 'intruder captured', media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
      if (!err && response.statusCode == 200) {
        res.render('captured', { title: 'Captured' });
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
