var http = require('https');
var cheerio = require('cheerio');
var url = 'https://www.imooc.com/learn/348';

function fiterChapters(html) {
    var $ = cheerio.load(html);

    var chapters = $('.chapter');

    // [{
    // 	chapterTitle: '',
    // 	videos: [
    // 	title: '',
    // 	id: ''
    // 	]
    // }]

    var courseData = [];

    chapters.each(function(item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('.chapter h3').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(item) {
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text().trim();
            var id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');

        item.videos.forEach(function(video) {
            console.log(' 【' + video.id + '】' + video.title + '\n');
        })
    })
}

http.get(url, function(res) {
    var html = '';

    res.on('data', function(data) {
        html += data;
    });

    res.on('end', function() {
        // console.log(html)
        var courseData = fiterChapters(html);
        printCourseInfo(courseData);
    })
}).on('error', function() {
    console.log('获取数据出错');
});