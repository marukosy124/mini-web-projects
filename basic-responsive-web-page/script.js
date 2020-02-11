window.onload = function(){
    document.getElementById("fadein").style.opacity = 1;
}

function callTask(){
    var taskbar = document.getElementById("taskbtn");
    if (taskbar.offsetWidth === 0) {
        taskbar.style.display = "inline-block";
    } else {
        taskbar.style.display = "none";
    }
}

function changeAlign(){
    var sectionhead = document.getElementsByTagName('h3');
    for(var i=0; i<sectionhead.length; i++){
        var style=window.getComputedStyle(sectionhead[i]);
        var align=style.getPropertyValue("text-align");
        if(align === "center"){
            sectionhead[i].style.textAlign = "left";
        }
        else if(align === "left"){
            sectionhead[i].style.textAlign = "right";
        }
        else{
            sectionhead[i].style.textAlign = "center";
        }
    }   
}

function addHobby(){
    var hobby = prompt("What is your new hobby?", "");
    if (hobby != null && hobby != "") {
        var newHobby = document.createElement("div");
        newHobby.innerHTML = hobby;
        document.getElementById("hobbies").appendChild(newHobby);
    }
    else{
        return false;
    }
}

function showProgressBar(){
    var progdiv = document.getElementById("progress");
    var progbar = document.getElementById("progressbar");
    if (progdiv.offsetWidth === 0) {
        progdiv.style.display = "block";
        progbar.style.width="0";
        window.onscroll = function() {showProgress()};

        function showProgress() {
            var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (windowScroll / height) * 100;
            progbar.style.width = scrolled + "%";
        }
    } else {
        progdiv.style.display = "none";
    }
}

function showRangeSlider(){
    var rangeslider = document.getElementById("range-slider");
    if (rangeslider.offsetWidth === 0) {
        rangeslider.style.display = "block";
        window.alert("After reading this message, you will see a range slider below.\nYou can use it to change the hue of the profile picture (the pepe one).\nSlide to the leftmost or the rightmost can change it back to the original look.\nTry to slide and see how the picture change!")
    } else {
        rangeslider.style.display = "none";
    }
}

function hue(value) {
    var hueVal = value + "deg";
    document.getElementById("pic").setAttribute("style", "-webkit-filter:hue-rotate(" + hueVal + ")")
}

