const pomoDuro = "pomoDuro";
let COUNTER_TIME = 0;


function pomoDuroNotify(COUNTER_TIME) {
    const header = "New message from pomoDuro!";
    const icon = "https://raw.githubusercontent.com/cliegargo/pomoDuro/master/res/pomoDuro.png";
    function start() {
        new Notification(header, {
        	icon: icon,
        	body: `Started ${COUNTER_TIME} minutes task.`
        });
    }

    function end() {
        new Notification(header, {
        	icon: icon,
            body: `${COUNTER_TIME} minutes task ended.`
        });
    }

    return {
        start, end
    };
}


function pomoDuroNotifyCheck() {
    if(Notification.permission === "granted") {
        console.log(true);
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if(permission === "granted") {
                console.log(true);
            }
        });
    }
}

function pomoDuroButtons(settings, buttonID) {
    const buttonIDArray = ["05", "15", "25"];
    let buttonIDPos = buttonIDArray.indexOf(this.id);
    buttonIDArray.splice(buttonIDPos, buttonIDPos + 1);

    if(settings == true) {
        for(var i = 0; i < buttonIDArray.length; ++i) {
            document.getElementById(buttonIDArray[i]).className = "disabled-button";
        }
    } else {
        for(var i = 0; i < buttonIDArray.length; ++i) {
            document.getElementById(buttonIDArray[i]).className = "set-button button";
        }
    }

    for(var i = 0; i < buttonIDArray.length; ++i) {
        document.getElementById(buttonIDArray[i]).disabled = settings;
    }
}


function pomoDuroResetPage() {
    document.title = pomoDuro;
    document.getElementById("time").innerHTML = "00:00";
}

function pomoDuroTimer(COUNTER_TIME) {
    var TIME = COUNTER_TIME * 60;

    let pomoDuroEndTimer = function() {
        clearInterval(pomoDuroStartTimer, 1000);
        pomoDuroResetPage();
        pomoDuroNotify(COUNTER_TIME).end();
        pomoDuroButtons(false, COUNTER_TIME);
    }

    let pomoDuroStartTimer = setInterval(function(){

        var MM = Math.floor(TIME / 60);
        var SS = TIME % 60;

        if(MM < 10) {
            MM = `0${MM}`;
        }
        if(SS < 10) {
            SS = `0${SS}`;
        }

        document.getElementById("time").innerHTML = `${MM}:${SS}`;
        document.title = `${pomoDuro} (${MM}:${SS})`;
        console.log(`${MM}:${SS}\t${TIME}`);

        TIME = TIME - 1;

        if(TIME == 0) {
            pomoDuroEndTimer();
        }
    }, 1000);

    setInterval(pomoDuroStartTimer, 1000);

    return {pomoDuroEndTimer};
}


function pomoDuroClicked() {
    COUNTER_TIME = parseInt(this.id);

    pomoDuroButtons(true, this.id);

    if(this.id == "reload-button") {
    	pomoDuroResetPage();
        window.location.reload();
        //pomoDuroTimer(COUNTER_TIME).pomoDuroEndTimer();
    } else {
        pomoDuroNotify(COUNTER_TIME).start();
        pomoDuroTimer(COUNTER_TIME);
    }
}


pomoDuroNotifyCheck();


document.getElementById("05").onclick = pomoDuroClicked;
document.getElementById("15").onclick = pomoDuroClicked;
document.getElementById("25").onclick = pomoDuroClicked;
document.getElementById("reload-button").onclick = pomoDuroClicked;
