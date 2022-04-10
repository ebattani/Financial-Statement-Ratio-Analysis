
$(function changeSelect() {
    if (document.getElementById("ratioChoice").value = "1") {
        document.getElementById("ratioText").innerhtml = "...";
    } else if (document.getElementById("ratioChoice").value = "2") {
        document.getElementById("ratioText").innerhtml = "[HEADER] [DATE] [COUNT] ...";
    } else if (document.getElementById("ratioChoice").value = "3") {
        document.getElementById("ratioText").innerhtml = "[HEADER] ...";
    } else if (document.getElementById("ratioChoice").value = "4") {
        document.getElementById("ratioText").innerhtml = "NOTE [DATE] ...";
    }
    });