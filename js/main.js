enchant(); // おまじない

//global
//俺のターン！
var myturn=false;
// 「ガッシ！ボカッ！」アタシは死んだ。
var Idied=false;
//ゲーム始まってる？
var gameplay=false;
//現在のゲーム人数
var PlayerNumberOfPeople=0;


window.onload = function() {

    var game = new Game(900, 400); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game.fps = 24; // frames（フレーム）per（毎）second（秒）：ゲームの進行スピードを設定しています。
    game.preload('./image/0d1.png');
    game.preload('./image/0d2.png');
    game.preload('./image/0d3.png');
    game.preload('./image/1d1.png');
    game.preload('./image/1d2.png');
    game.preload('./image/1d3.png');
    game.preload('./image/2d1.png');
    game.preload('./image/2d2.png');
    game.preload('./image/2d3.png');
    game.preload('./image/3d1.png');
    game.preload('./image/3d2.png');
    game.preload('./image/3d3.png');
    game.preload('./image/4d1.png');
    game.preload('./image/4d2.png');
    game.preload('./image/4d3.png');
    game.preload('./image/5d1.png');
    game.preload('./image/5d2.png');
    game.preload('./image/5d3.png');
    game.preload('./image/6d1.png');
    game.preload('./image/6d2.png');
    game.preload('./image/6d3.png');
    game.preload('./image/7d1.png');
    game.preload('./image/7d2.png');
    game.preload('./image/7d3.png');
    game.preload('./image/8d1.png');
    game.preload('./image/8d2.png');
    game.preload('./image/8d3.png');
    game.preload('./image/9d1.png');
    game.preload('./image/9d2.png');
    game.preload('./image/9d3.png');
    game.preload('./image/deck.png');
    game.preload('./image/header.png');
    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。
        //UI
        game.rootScene.backgroundColor  = '#7ecef4';
        var log = new Sprite(260, 400);
        log.backgroundColor='#FFFF00';
        log.x=640;
        log.y=0;
        game.rootScene.addChild(log);
        var logline = new Sprite(250, 390);
        logline.backgroundColor='#FFFFFF';
        logline.x=645;
        logline.y=5;
        game.rootScene.addChild(logline);
        //user
        var user = [new Sprite(160, 60),new Sprite(160, 60),
                    new Sprite(160, 60),new Sprite(160, 60)];
        userBackgroundColor='#000000';
        textXline=160;
        textYline=0;
        //playerは最大四人までですから
        for(i=0;i<user.length;i++){
            user[i].moveTo(textXline*i,textYline);
            user[i].backgroundColor=userBackgroundColor;
            game.rootScene.addChild(user[i]);
        }
        var usertextborder = [new Sprite(150, 50),new Sprite(150, 50),
                              new Sprite(150, 50),new Sprite(150, 50)];
        usertextborderBackgroundColor='#FFFFFF';
        for(i=0;i<usertextborder.length;i++){
            usertextborder[i].moveTo(5+textXline*i,5+textYline);
            usertextborder[i].backgroundColor=usertextborderBackgroundColor;
            game.rootScene.addChild( usertextborder[i]);
        }


        //cardA
        var cardA = new Sprite(100, 160);
        cardA.image = game.assets['./image/header.png'];
        cardA.x = 60;
        cardA.y = 120;
        game.rootScene.addChild(cardA);

        //cardB
        var cardB = new Sprite(100, 160);
        cardB.image = game.assets['./image/header.png'];
        cardB.x = 200;
        cardB.y = 120;
        game.rootScene.addChild(cardB);

        //cardC
        var cardC = new Sprite(100, 160);
        cardC.image = game.assets['./image/header.png'];
        cardC.x = 340;
        cardC.y = 120;
        game.rootScene.addChild(cardC);

        //cardD(deck)
        var cardD = new Sprite(120, 160);
        cardD.image = game.assets['./image/deck.png'];
        cardD.x = 480;
        cardD.y = 120;
        game.rootScene.addChild(cardD);
        //username欄
        var usertext=[[new Label(''),new Label(''),null],
                     [new Label(''),new Label(''),null],
                     [new Label(''),new Label(''),null],
                     [new Label(''),new Label(''),null]];
        for(i=0;i<usertext.length;i++){
            usertext[i][0].moveTo(10+textXline*i,5+textYline);
            game.rootScene.addChild(usertext[i][0]);
            usertext[i][1].moveTo(10+textXline*i,25+textYline);
            usertext[i][1].font="20px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            game.rootScene.addChild(usertext[i][1]);
        }

        //log欄
        var textbox=[new Label('1'),new Label('2'),new Label('3'),new Label('4'),
                     new Label('5'),new Label('6'),new Label('7'),new Label('8'),
                     new Label('9'),new Label('10'),new Label('11'),new Label('12'),
                     new Label('13'),new Label('14'),new Label('15'),new Label('16'),
                     new Label('17'),new Label('18'),new Label('19')];
        console.log(textbox.length);
        textXline=650;
        textYline=20;
        for(i=0;i<textbox.length;i++){
            textbox[i].moveTo(textXline,10+textYline*i);
            game.rootScene.addChild(textbox[i]);
        }

        //登録欄
        var nametextlabel = new Label('名前:');
        nametextlabel.moveTo(60,350)
        game.rootScene.addChild(nametextlabel);
        var inputname = new Entity();
        inputname.width = 100;
        inputname.height = 20;
        inputname.x=100;
        inputname.y=350;
        inputname._element = document.createElement('input');
        inputname._element.setAttribute("name","name");
        inputname._element.setAttribute("type","text");
        inputname._element.setAttribute("maxlength","12");
        game.rootScene.addChild(inputname);
        var buttonp = new Button("参加");
        buttonp.moveTo(210,350);
        game.rootScene.addChild(buttonp);
        var buttons = new Button("始める");
        buttons.moveTo(270,350);
        game.rootScene.addChild(buttons);
        var buttone = new Button("退出");
        buttone.moveTo(330,350);
        game.rootScene.addChild(buttone);


        //ゲーム枠
        var nametextlabel2 = new Label('数字入力(000-999):');
        nametextlabel2.moveTo(60,300)
        game.rootScene.addChild(nametextlabel2);
        var inputnumber = new Entity();
        inputnumber.width = 100;
        inputnumber.height = 20;
        inputnumber.x=190;
        inputnumber.y=300;
        inputnumber._element = document.createElement('input');
        inputnumber._element.setAttribute("name","number");
        inputnumber._element.setAttribute("type","text");
        inputnumber._element.setAttribute("maxlength","3");
        inputnumber._element.setAttribute("style","ime-mode:disabled;");
        game.rootScene.addChild(inputnumber);
        var buttong = new Button("GO");
        buttong.moveTo(300,300);
        game.rootScene.addChild(buttong);

        //ブラフ・受け取るボタン
        var buttonb = new Button("ブラフ！");
        buttonb.moveTo(400,300);
        game.rootScene.addChild(buttonb);
        var buttonr = new Button("受け取る");
        buttonr.moveTo(500,300);
        game.rootScene.addChild(buttonr);

        //init
        init();



        //socket.io
        //var s = io.connect(); //リモート
        var s = io.connect('http://localhost:8080/'); //ローカル
        s.on("disconnect", function () {});

        s.on('connected', function() {
            //部屋番号送信・初期表示
            s.emit('init', {'room': RoomID});
        });

        // シーンに「毎フレーム実行イベント」を追加します。
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
        });
        buttonp.addEventListener(Event.TOUCH_START, function(e) {
            //参加ボタン
            //名前入力のちPlay押す
            if(buttonp.opacity==1 && inputname._element.value!=""){
                //既に4人です
                if(PlayerNumberOfPeople>3){
                    logpush("既に4人に達しています！");
                    return;
                }
                //既にゲーム始まっているんで・・・
                if(gameplay){
                    logpush("既にゲーム始まってます！");
                    return;
                }
            logpush("play:"+inputname._element.value);
            s.emit("gameplay",{name:inputname._element.value,roomid:RoomID});
            //見えなくしよう
            buttonp.opacity=0;
            nametextlabel.opacity=0;
            inputname.opacity=0;
            //見えるようにしよう
            buttons.opacity=1;
            buttone.opacity=1;
            }
        });
        buttons.addEventListener(Event.TOUCH_START, function(e) {
            //始めるボタン
            if(buttons.opacity==1){
            logpush("start");
            }
        });
        buttone.addEventListener(Event.TOUCH_START, function(e) {
            //退出ボタン
            if(buttone.opacity==1){
                //既にゲーム始まっているんで・・・
                if(gameplay){
                    logpush("既にゲーム始まってます！");
                    return;
                }
                //始まってない場合に退出します
                s.emit("gameleave");
                //クライアント初期化
                init();
            }
        });
        buttonb.addEventListener(Event.TOUCH_START, function(e) {
            //ブラフボタン
            if(buttonb.opacity==1){
            logpush("bluff");
            }
        });
        buttong.addEventListener(Event.TOUCH_START, function(e) {
            //GOボタン
            if(buttong.opacity==1){
            logpush("GO:"+inputnumber._element.value);
            }
        });
        buttonr.addEventListener(Event.TOUCH_START, function(e) {
            //受け取るボタン
            if(buttonr.opacity==1){
            logpush("receive");
            }
        });
        cardA.addEventListener(Event.TOUCH_START, function(e) {
            if(cardA.opacity==1){
            logpush("cardA");
            }
        });
        cardB.addEventListener(Event.TOUCH_START, function(e) {
            if(cardB.opacity==1){
                logpush("cardB");
            }
        });
        cardC.addEventListener(Event.TOUCH_START, function(e) {
            if(cardC.opacity==1){
                logpush("cardC");
            }
        });
        cardD.addEventListener(Event.TOUCH_START, function(e) {
            if(cardD.opacity==1){
            logpush("cardD");
            }
        });





        //ログを下に持ってくる処理: logpush
        function logpush(label){
        for(i=0;i<textbox.length-1;i++){
        textbox[i].text=textbox[i+1].text;
        }
            textbox[textbox.length-1].text=label;
        }

        //クライアント初期化: init
        function init(){
        //いらないEntityを隠す
        cardA.opacity=0;
        cardB.opacity=0;
        cardC.opacity=0;
        //数字セレクト
        nametextlabel2.opacity=0;
        inputnumber.opacity=0;
        buttong.opacity=0;
        //始めるボタン
        buttons.opacity=0;
        //退出ボタン
        buttone.opacity=0;
        //ブラフ・受け取る
        buttonb.opacity=0;
        buttonr.opacity=0;
        inputname._element.value="";
        inputnumber._element.value="";
        //名前入力欄
        nametextlabel.opacity=1;
        buttonp.opacity=1;
        inputname.opacity=1;
        }


        //socket.io受け取り function
        //自分のターンだ！

        //ログ受け取り
        s.on("logmessage", function (data) {
            logpush(data);
        });
        //参加者を最初に表示
        s.on("viewinit", function (data) {
            //挿入です
            for(i=0;i<data.length;i++){
                usertext[i][0].text=data[i].name;
                usertext[i][1].text=data[i].hp;
                usertext[i][2]=data[i].id;
            }
            if(data.length<=4){
                PlayerNumberOfPeople=data.length;
            }else{
            //既に4人以上参加してるので無理です
                PlayerNumberOfPeople=4;
            }
        });
        //抜けた参加者更新
        s.on("newleave", function (leavesocketid) {
        //抜けた奴を特定しよう
        for(i=0;i<usertext.length;i++){
            if(usertext[i][2]==leavesocketid){
                console.log(leavesocketid);
                //抜けた奴を消す
                usertext[i][0].text="";
                usertext[i][1].text="";
                for(x=i+1;x<usertext.length;x++){
                    usertext[x-1][0].text=usertext[x][0].text;
                    usertext[x-1][1].text=usertext[x][1].text;
                    usertext[x-1][2]=usertext[x][2];
                    usertext[x][0].text="";
                    usertext[x][1].text="";
                    usertext[x][2]=null;

                }
                PlayerNumberOfPeople--;
            }
        }
        });
        //通信が切れた参加者更新
        s.on("newdisconnect", function (leavesocketid) {
        //抜けた奴を特定しよう
             for(i=0;i<usertext.length;i++){
                if(usertext[i][2]==leavesocketid){
                    if(gameplay){//抜けた奴を赤く
                    user[i].backgroundColor="#FF0000";
                    }else{
                        //抜けた奴を消す
                        usertext[i][0].text="";
                        usertext[i][1].text="";
                        for(x=i+1;x<usertext.length;x++){
                            usertext[x-1][0].text=usertext[x][0].text;
                            usertext[x-1][1].text=usertext[x][1].text;
                            usertext[x-1][2]=usertext[x][2];
                            usertext[x][0].text="";
                            usertext[x][1].text="";
                            usertext[x][2]=null;
                            PlayerNumberOfPeople--;
                        }
                    }
                    }
                }
        });
        //新しく入室した参加者更新(自分も含む)
        s.on("newjoin", function (data) {
            if(PlayerNumberOfPeople<4){
                usertext[PlayerNumberOfPeople][0].text=data.name;
                usertext[PlayerNumberOfPeople][1].text=data.hp;
                usertext[PlayerNumberOfPeople][2]=data.id;
                PlayerNumberOfPeople++;
            }

        });
        //disconnect!
        s.on("disconnect", function (data) {
            logpush(data);
        });



        //gameplay中の処理
        //
        //3枚のカードの表示
        s.on("carddisplay", function (data) {
            if(gameplay){
                cardA.image=game.assets['./image/'
                                           +data[0].number+"d"+data[0].damage+".png"];
                cardB.image=game.assets['./image/'
                                           +data[1].number+"d"+data[1].damage+".png"];
                cardC.image=game.assets['./image/'
                                           +data[2].number+"d"+data[2].damage+".png"];
                cardA.opacity=1;
                cardB.opacity=1;
                cardC.opacity=1;

            }

        });
         //カードの非表示
        s.on("cardnondisplay", function () {
            if(gameplay){
                cardA.image=game.assets['./image/header.png'];
                cardB.image=game.assets['./image/header.png'];
                cardC.image=game.assets['./image/header.png'];
                cardA.opacity=1;
                cardB.opacity=1;
                cardC.opacity=1;
            }

        });
    }
    game.start();


};


