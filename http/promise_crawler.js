var http = require('https');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'https://www.imooc.com/learn/';
var learnNumber_baseUrl = 'https://www.imooc.com/course/AjaxCourseMembers?ids=';
var url = 'https://www.imooc.com/learn/348';
var videoIds = [348, 259];

function filerChapters(pageData) {
    var html = pageData.html;
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.hd .l').text();
    var number = pageData.number;
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
        title: title,
        number: number,
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
    coursesData.forEach(function(courseData) {
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
    })

    coursesData.forEach(function(courseData) {
        console.log('### ' + courseData.title + '\n');
        courseData.videos.forEach(function(item) {
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');

            item.videos.forEach(function(video) {
                console.log(' 【' + video.id + '】' + video.title.trim().split('(')[0]);
            })
        })
    })
}

function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        console.log('正在爬取' + url)
        http.get(url, function(res) {
            var html = '';

            res.on('data', function(data) {
                html += data;
            });

            res.on('end', function() {
                resolve(html);
            })
        }).on('error', function(e) {
            reject(e);
            console.log('获取数据出错');
        });

    })
}

function getLearnDataAsync(html) {
    return new Promise(function(resolve, reject) {
        var $ = cheerio.load(html);
        var id = $('.person-num').attr('href').split('/')[2];
        var pageData = {
            html: html,
            number: 0
        };

        var db = '';
        http.get(learnNumber_baseUrl + id, function(res) {
            res.on('data', function(data) {
                db += data;
                db = JSON.parse(db);
                pageData.number = parseInt(db.data[0].numbers, 10);
            });

            res.on('end', function() {
                resolve(pageData);
            });

        }).on('error', function() {
            console.log('error');
        });
    });
}



var fetchCourseArray = [];

videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id).then(function(html) {
        return getLearnDataAsync(html);
    }));
})

Promise
    .all(fetchCourseArray)
    .then(function(pages) {
        var coursesData = [];

        pages.forEach(function(pageData) {
            var courses = filerChapters(pageData);
            coursesData.push(courses);
        })

        coursesData.sort(function(a, b) {
            return a.number < b.number;
        })

        printCourseInfo(coursesData);
    })