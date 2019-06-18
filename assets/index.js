function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

window.onload = function() {
    const timeLabel = document.querySelector('.time')
    const dateLabel = document.querySelector('.date')

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var d = new Date()
    var day = days[d.getDay()]
    var hr = d.getHours()
    var min = d.getMinutes()
    if (min < 10) {
        min = "0" + min
    }
    var ampm = "am"
    if( hr > 12 ) {
        hr -= 12
        ampm = "pm"
    }
    var date = d.getDate()
    var month = months[d.getMonth()]
    var year = d.getFullYear()

    timeLabel.innerHTML = pad(hr, 2) + ':' + pad(min, 2) + ' ' + ampm
    dateLabel.innerHTML = pad(d.getDay(), 2) + ' ' + month + ', ' + year
}