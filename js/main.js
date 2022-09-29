$(window).on('load', function () {
    $('body').css('overflow', 'auto')
    $('.load').fadeOut(300)
    $(window).on('resize', function () {
        windowcheck()
    }).trigger('resize')
    windowcheck()
    $('.overflowbuttons').hide()
    twemoji.parse($('body')[0])
    for (const member of team) {
        $('#team').append(`<a class="hoverlink" href="${member.link}" target="_blank">${member.name} <i class="bi bi-box-arrow-up-right"></i></a>`)
    }
})

$(document).on('click', function (event) {
    if (!$(event.target).closest('.topnav').length && !$(event.target).closest('.overflowbuttons').length) {
        $('.overflowbuttons').slideUp()
    }
})

$('.overflow').on('click', function () {
    if ($('.overflowbuttons').css('display') == 'none') $('.overflowbuttons').slideDown()
    else $('.overflowbuttons').slideUp()
})

function search(elem) {
    $('.levels').empty()
    if (elem.value == '') {
        for (let i = 0; i < list.length; i++) {
            $('.levels').append(`<div><h1>#${i + 1}</h1>${listvideo(list[i])}<a class="text" href="./level/${i + 1}"><h2>${list[i].name}</h2><h3>${list[i].author}</h3></a></div>`)
        }
    } else {
        let newsearch = []
        let i = 0
        for (const level of list) {
            let searchstr = `${level.name}${level.author}`.toLowerCase()
            if (searchstr.includes(elem.value.toLowerCase())) {
                level.position = i + 1
                newsearch.push(level)
            }
            i++
        }
        for (let i = 0; i < newsearch.length; i++) {
            $('.levels').append(`<div><h1>#${newsearch[i].position}</h1>${listvideo(newsearch[i])}<a class="text" href="./level/${newsearch[i].position}"><h2>${newsearch[i].name.replace(new RegExp(`(${elem.value})`, 'gi'), `<span class="searchHL">$1</span>`)}</h2><h3>${newsearch[i].author.replace(new RegExp(`(${elem.value})`, 'gi'), `<span class="searchHL">$1</span>`)}</h3></a></div>`)
        }
    }
    windowcheck()
}