var fs = require('fs');
var request = require('request');
var config = require('./config');

/*
 * content=the,and,of
 * year_start=1800
 * year_end=2008
 * corpus=15英文 23中文
 */
console.log('mission start');

var url = "https://books.google.com/ngrams/graph?content=the&year_start=1800&year_end=2008&corpus=15";
var qs = {
    content: config.content,
    year_start: 1800,
    year_end: 2008,
    corpus: config.corpus
}

request({
    'url': url,
    'qs': qs,
    // 'proxy': 'http://127.0.0.1:1080'
}, function(error, response, body){
    if (!error && response.statusCode == 200) {
        var json_datas = body.match(/var data = (\[[^;]*);/)[1].trim();
        var datas = JSON.parse(json_datas);
        for (data of datas) {
            fs.appendFileSync('temp.csv', data.ngram);
            var year = 1800;
            for (time of data.timeseries) {
                fs.appendFileSync('temp.csv', ',' + year++);
                fs.appendFileSync('temp.csv', ',' + time + '\n');
            }
        }
        console.log('mission success');
    } else {
        console.log(error);
        console.log('mission failed');
    }
});