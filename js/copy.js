function get_year() {
    var date = new Date();
    return date.getFullYear();
}

document.getElementById("year").innerHTML = "&copy; " + get_year().toString();