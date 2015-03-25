console.log("start");
tests(function(text){
    console.log(text);
});


function tests(callback){
    setTimeout( function(){
    callback("a");
    }, 3000);
}
