const scoreSpan = document.getElementById("scoreSpan");

let user_score = localStorage.getItem("score");

scoreSpan.innerText = user_score;

function setCookie(name, value, minutesToExpire) {
    var d = new Date();
    d.setTime(d.getTime() + (minutesToExpire * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

setCookie("user_score", user_score, 3); // Setting cookie to expire in 3 minutes


localStorage.clear();
