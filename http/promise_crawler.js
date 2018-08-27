var http = require('https');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'https://www.imooc.com/learn/';
var url = 'https://www.imooc.com/learn/348';
var videoIds = [348, 259];

function fiterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.hd .l').text();
    var number = parseInt($('.js-learn-num').text().trim(), 10);

    // courseData = {
    //     title: title,
    //     number: number,
    //     videos: [{
    //      chapterTitle: '',
    //      videos: [
    //      title: '',
    //      id: ''
    //      ]
    //     }]
    // }

    var courseData = {
        videos: []

    }

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
        courseData.videos.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(coursesData) {
    coursesData.forEach(function(argument) {
        console.log(coursesData.number + ' 人学过' + coursesData.title + '\n');
    })


    coursesData.forEach(function(courseData) {
        console.log('### ' + courseData.title + '\n')
        courseData.videos.forEach(function(item) {
            console.log('### ' + courseData.title + '\n')
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');

            item.videos.forEach(function(video) {
                console.log(' 【' + video.id + '】' + video.title + '\n');
            })
        })
    })
}

function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        console.log('正在爬去' + url)
        http.get(url, function(res) {
            var html = '';

            res.on('data', function(data) {
                html += data;
            });

            res.on('end', function() {
                // console.log(html)
                // var courseData = fiterChapters(html);
                resolve(html);

                // printCourseInfo(courseData);
            })
        }).on('error', function(e) {
            reject(e);
            console.log('获取数据出错');
        });

    })
}

var fetchCourseArray = [];

videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})

Promise
    .all(fetchCourseArray)
    .then(function(pages) {
        var coursesData = [];

        pages.forEach(function(html) {
            var courses = fiterChapters(html);
            coursesData.push(courses);
        })

        coursesData.sort(function(a, b) {
            return a.number < b.number;
        })

        printCourseInfo(coursesData);
    })