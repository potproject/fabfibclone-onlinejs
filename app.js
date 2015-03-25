var express = require('express')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , ejs=require('ejs');

//MongoDB接続処理
mongoose.connect('mongodb://localhost/fibfab');
// Mongoose定義フェーズ
var MongooseSchema   = mongoose.Schema;

//グローバル変数
defaultcard=[
    {number:0,damage:1},{number:0,damage:1},{number:0,damage:1},
    {number:0,damage:2},{number:0,damage:3},
    {number:1,damage:1},{number:1,damage:1},{number:1,damage:1},
    {number:1,damage:2},{number:1,damage:3},
    {number:2,damage:1},{number:2,damage:1},{number:2,damage:1},
    {number:2,damage:2},{number:2,damage:3},
    {number:3,damage:1},{number:3,damage:1},{number:3,damage:1},
    {number:3,damage:2},{number:3,damage:3},
    {number:4,damage:1},{number:4,damage:1},{number:4,damage:1},
    {number:4,damage:2},{number:4,damage:3},
    {number:5,damage:1},{number:5,damage:1},{number:5,damage:1},
    {number:5,damage:2},{number:5,damage:3},
    {number:6,damage:1},{number:6,damage:1},{number:6,damage:1},
    {number:6,damage:2},{number:6,damage:3},
    {number:7,damage:1},{number:7,damage:1},{number:7,damage:1},
    {number:7,damage:2},{number:7,damage:3},
    {number:8,damage:1},{number:8,damage:1},{number:8,damage:1},
    {number:8,damage:2},{number:8,damage:3},
    {number:9,damage:1},{number:9,damage:1},{number:9,damage:1},
    {number:9,damage:2},{number:9,damage:3}
    ];

var UserSchema = new MongooseSchema({
    room:     {type:String,require:true},
    gameplay: { type:String,required:true}, //wait/staret/end
    player:   { type:Array}, //Array :Player
    card:     { type:Array}, //card 0-50
    hand:     { type:Array}, //hand[3]
});
var dbdata=mongoose.model('User', UserSchema);


//express設定
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

var useport=8080;
// all environments
app.set('port', process.env.PORT || useport);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'img')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//入室
app.get('/', function(req,res){
      fs.readFile('form.html',function(err, data){
        if (err) {
            console.error("console:"+err);
            res.send(404); // エラーで404を返す
            return;
        }
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
});
//index.htmlのGET
app.post('/', function(req,res){
        if(req.body.room==null){
            res.send(500); // エラーで404を返す
            return;
        }
        //room存在するか？
        var query=dbdata.where({room:req.body.room});
        query.findOne(function (err, docs) {
            if(docs==null && !err){
                //登録なしの場合:MongoDBに登録
                var ins = new dbdata();
                ins.room=req.body.room;
                ins.gameplay  = 'wait';
                ins.card = shuffle(defaultcard);
                ins.hand=[];
                ins.save(function(err) {
                if (err) { console.log(err); }
                console.log("insert");
                });
            }
            //登録がある場合は何もしません
            res.render('index.ejs',{room_id:req.body.room});
        });

});

//画像ファイルのGET
var IMAGE_DIR = 'image';
app.get('/'+IMAGE_DIR+'/'+':msg', function(req, res) {
  // まず引数に相当する部分としてmsgをチェック．型や範囲など．
  if (typeof req.params.msg === 'undefined') {
    res.send(400); //400を返す
    return;
  }

  fs.readFile('./'+IMAGE_DIR+'/'+req.params.msg, function(err, data) {
    if (err) {
      console.error("console:"+err);
      res.send(404); // エラーで404を返す
      return;
    }
    res.set('Content-Type', 'image/png');
    res.send(data);
  });
});

//クライアント向けjsのGET
var CLIENTJS_DIR = 'js';
app.get('/'+CLIENTJS_DIR+'/'+':msg', function(req, res) {
  // まず引数に相当する部分としてmsgをチェック．型や範囲など．
  if (typeof req.params.msg === 'undefined') {
    res.send(400); //404を返す
    return;
  }

  fs.readFile('./'+CLIENTJS_DIR+'/'+req.params.msg, function(err, data) {
    if (err) {
      console.error("console:"+err);
      res.send(404); // エラーで404を返す そしたらパソコンを破壊する。
      return;
    }
    res.set('Content-Type', ' text/javascript');
    res.send(data);
  });
});


 //listen
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//socket.io処理 - connection
var chat = io.sockets.on('connection', function(socket) {
    socket.emit('connected');
    console.log(socket.id+" connected");

    socket.on('msg post', function(msg) {
        chat.to(socket.setRoominfo).emit("logmessage", msg);
    });
    //room別に管理
    socket.on("init",function(req){
        //join(room)で部屋を作る
        socket.setRoominfo=req.room;
        socket.join(req.room);

        console.log(req.room+" join");

    });
    //game立ち上げボタン
    socket.on('gameplay',function(player){
        console.log("gameready:"+player.name+
                    "  roomid:"+player.roomid+"  id:"+socket.id);
        //player追加
        dbdata.update({ room:player.roomid },
                    { $push:{player:{name:player.name,hp:12,socketid:socket.id}} },
                    { upsert: false, multi: true }, function(err) {
            //log
            chat.to(socket.setRoominfo).emit("logmessage", player.name+"さんがゲームに参加しました！");
            console.log("ready!");
            socket.setPlayerNameinfo=player.name;
            //
            playerkill(socket.setRoominfo);
        });

    });

    //socket.io処理 - disconnection
    socket.on('disconnect', function() {
    console.log(socket.id+" disconnect");
    //dbに登録した人だったら？
        if(socket.setPlayerNameinfo!=undefined && socket.setPlayerNameinfo!=null){
            //dbから削除・・・する？
            //とりあえずlog
            chat.to(socket.setRoominfo).emit("logmessage", socket.setPlayerNameinfo+"さんとの通信が切れました！");

        }
    });

});



//Fisher–Yatesアルゴリズムでのカードシャッフル！
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
 return array;
}

//メッセージ送信のためのメゾット
function messagesend(socket) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
 return array;
}

//playerkill
function playerkill(myroom){
    var query=dbdata.where({room:myroom});
    query.findOne(function (err, docs) {
        if(docs!=null){
            for(i=0;i<docs.player.length;i++){
                if(docs.player[i].hp<=0){
                    console.log(docs.player[i].name+" is dead!");
                }
            }
        }
    });
}
