var request = require('request');

var url = "https://books.google.com/ngrams/graph?content=the%2Cand%2Cof&year_start=1800&year_end=2008&corpus=15&smoothing=4&share=&direct_url=t1%3B%2Cthe%3B%2Cc0%3B.t1%3B%2Cand%3B%2Cc0%3B.t1%3B%2Cof%3B%2Cc0";

request({
    'url': url,
    'proxy': 'http://127.0.0.1:1080'
}, function(error, response, body){
    var json_data = body.match(/var data = (\[[^;]*);/)[1].trim();
    var data = JSON.parse(json_data);
    console.log(data);
});