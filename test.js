console.log("start");
tests(function(text){
    console.log(text);
});
var sum = answer(10000000);
console.log(sum+"/10000000");
console.log(sum/10000000*100+"%");


function tests(callback){
    setTimeout( function(){
    callback("a");
    }, 3000);
}

function answer(i){
    var correct=0;
    var max=0;
    for(var x=0; x<i;x++){
        var ans=0;
        for(var y=0; y<25;y++){
        rand=Math.floor( Math.random() * 4 );
        if(rand==0){
            ans++;
        }
        }
        if(ans>14){
            correct++;
            //console.log("hit:"+ans);
            if(max<ans){
                max=ans;
            }
        }
    }
    console.log("max:"+max);
    return correct;
}