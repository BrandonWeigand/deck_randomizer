function link_init(){
    let l = 0;
    let links = document.querySelectorAll("#links-external a");
    for (l in links) {
        let targets = document.querySelectorAll("a[href='#"+links[l].id+"']");
        for(t in targets){
            targets[t].href = links[l].href;
            targets[t].target = links[l].target;
        }
        
    }
}

var pause = document.getElementById("btn_pause");
var range = document.getElementById("que_range");
var deck = document.getElementById("deck_max");
var time = document.getElementById("deal_time");
var start = null;
var clock = null;
var stop = true;

function place_card(){
    var n = Math.round(Math.random()*5)+1;
    var e = document.querySelectorAll("#card_layout>path");
    var c = -1;
    for(var i=0;i<e.length;i++){
        e[i].classList.remove("trail");
        
        if(e[i].classList.contains("target")==true){
            c=i;
            e[i].classList.add("trail");
        }else{
            e[i].classList.remove("miss");
            e[i].classList.remove("hit");
        }
        e[i].classList.remove("target");
    }
    while(n-1==c){n = Math.round(Math.random()*5)+1;}
    e[n-1].classList.add("target");
    document.querySelectorAll("#card_layout")[0].scrollIntoView()
}

function step(timestamp) {
    if (pause.value=="⏸") {
        timestamp = new Date().getTime();
        if(start==undefined||start==null){start = timestamp;}
        //console.log('tick:',timestamp);
        var dist = timestamp-start;
        //console.log(dist,start);
        range.value = (dist/(time.value*1000))*100;
        if(range.value>=100){
            start = timestamp;
            deck.value -= 1;
            place_card();
        }
        if(deck.value<=0){
            pause.onclick.apply();
        }

        anim(timestamp);
    }else{
        cancelAnimationFrame(clock);
        clock=null;
        start=null;
    }
}
window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f){return setTimeout(f, 1000/60)}

function anim(timestamp){
    requestAnimationFrame(function(timestamp){
        step(timestamp);
    });
}

function ini(){
    pause.onclick=function(){
        //console.log("click");
        if(pause.value=="⏸"){pause.value="️️️️▶️";}else{
            var e = document.getElementById("card_layout");
            pause.value="⏸";
            e.focus();
            e.scrollIntoView();
            step(Date.now());
        }
    }
    place_card();
}

ini();