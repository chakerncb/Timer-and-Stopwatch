var tm;
var running = false;

function status(){
var mode = document.getElementById("mode").value;
if (mode == "stopwatch"){
    document.getElementById("mn").readOnly = true;
    document.getElementById("sc").readOnly = true;
    document.getElementById("mn").value = 0;
    document.getElementById("sc").value = 0;
}
else {
    document.getElementById("mn").readOnly = false;
    document.getElementById("sc").readOnly = false;
}
}

function toggle() {
    if (running) {
        stop();
    } else {
        play();
    }
}

function toggle2() {
    if (running) {
        split();
    } else {
        reset();
    }
}

function play() {
    var mn = parseInt(document.getElementById("mn").value);
    var sc = parseInt(document.getElementById("sc").value);
    var mode = document.getElementById("mode").value;

    var valeur = mn * 60 + sc;

    if( mode == "count_d"){



        tm = setInterval(function () {
            if (valeur <= 0) {
                alert("Time's up!");
                clearInterval(tm);
                running = false;
                document.getElementById("toggle").value = "Start";
            } else {
                valeur--;
                var reste = valeur % 60;
                document.getElementById("mn").value = (valeur - reste) / 60;
                document.getElementById("sc").value = reste;
            }
        }, 1000);

    } else {

        tm = setInterval(function () {
                valeur++;
                var reste = valeur % 60;
                document.getElementById("mn").value = (valeur - reste) / 60;
                document.getElementById("sc").value = reste;
        }, 1000);
        document.getElementById("in").value = "split";

    }



    running = true;
    document.getElementById("toggle").value = "Stop";
}

function stop() {
    clearInterval(tm);
    running = false;
    document.getElementById("toggle").value = "Start";
    document.getElementById("in").value = "reset";
}

function split() {
    var mode = document.getElementById("mode").value;
  
    if (mode == "count_d"){
        reset();
    }
    else {
    var list = document.getElementById("splits");
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(document.getElementById("mn").value + ":" + document.getElementById("sc").value));
    list.appendChild(item);
    }
}

function reset() {
    document.getElementById("mn").value = 0;
    document.getElementById("sc").value = 0;
    stop();
    var list = document.getElementById("splits");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }


}