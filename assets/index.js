function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

window.onload = function() {

    // set time and date

    const timeLabel = document.querySelector('.time')
    const dateLabel = document.querySelector('.date')

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    var d = new Date()
    var day = d.getDate()
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
    dateLabel.innerHTML = pad(day, 2) + ' ' + month + ', ' + year

    // get articles from dev.to
    let articles = document.querySelector('.articles')

    var xhr1 = new XMLHttpRequest()
    xhr1.open('GET', 'https://dev.to/api/articles', true)
    xhr1.responseType = 'json'
    xhr1.onload = function() {
        var status = xhr1.status
        if (status === 200) {
            for (let i = 0; i < 10; i++) {
                let clone = document.querySelector('.default-article').cloneNode(true)
                clone.className = ''
                clone.style.display = 'inline-block'

                if (xhr1.response[i]['cover_image'] == null) {
                    clone.getElementsByClassName('title')[0].style.paddingTop = '30px'
                } else {
                    let image = clone.getElementsByClassName('image')[0]
                    image.className = 'image'
                    image.setAttribute('src', xhr1.response[i]['cover_image'])
                    clone.getElementsByClassName('title')[0].style.marginTop = '10px'
                }
                var title = xhr1.response[i]['title']
                let maxCount = 45
                if (title.length > maxCount) {
                    title = title.substring(0, maxCount)
                    title += '...'
                }
                clone.getElementsByClassName('title')[0].innerHTML = '<a href="' + xhr1.response[i]['url'] + '">' + title + '</a>'
                if (xhr1.response[0]['description'] == '') {
                    clone.getElementsByClassName('desc')[0].style.display = 'none'
                } else {
                    var desc = xhr1.response[i]['description']
                    if (desc.length > 40) {
                        desc = desc.substring(0, 10)
                        desc += '...'
                    }
                    clone.getElementsByClassName('desc')[0].innerHTML = desc
                }
                clone.getElementsByClassName('reaction-count')[0].innerHTML = '<span class="red">&hearts;</span> ' + xhr1.response[i]['positive_reactions_count']

                articles.appendChild(clone)
            }
        }
    }
    xhr1.send();
}