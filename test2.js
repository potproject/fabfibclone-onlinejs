var array=[ {number:0,damage:2},{number:0,damage:3},{number:0,damage:1},{number:3,damage:1}];

console.log(cardsort(array));

var x=["a","b"];
var b=x.slice(0,100);
console.log("b:"+x);
console.log("xs:"+x.shift());
console.log("xs:"+x.shift());
console.log("xs:"+x.shift());

function cardsort(card){
    if(card){
        card.sort(
            function(a,b){
                var aName=a["number"];
                var bName=b["number"];
                if(aName>bName) return -1;
                if(aName<bName) return 1;
                return 0;
            }
        );
    }
    return card;
}
