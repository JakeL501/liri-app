var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function (err) {

        if (err) {
            console.log(err);
        } else {
            // console.log("Content Added!");
        }

    });
};

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

var params = {
    screen_name: '@mntypython74',
    count: 20
};


run();

function run() {

    if (input1 === "my-tweets") {

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log('');
                console.log('My Last 20 Tweets: ');
                console.log('--------------------------');
                tweets.forEach(function (individualTweet) {
                    console.log('Time Posted: ' + individualTweet.created_at);
                    console.log('Tweet: ' + individualTweet.text);
                    console.log('--------------------------');


                });

            } else {
                console.log(error);
            };
        });

        log();

    } else if (input1 === "spotify-this-song") {

        if (input2.length < 1) {

            input2 = "The Sign Ace of Base";
        };

        var spotify = new Spotify({
            id: '1643458b064a4012b0e6e486818e1465',
            secret: '0bc0624449094d2b9664ca16eacde3f3'
        });

        spotify.search({
            type: 'track',
            query: input2
        }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log('');
            console.log('Spotify Song Information Results: ');
            console.log('--------------------------');
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
            console.log('--------------------------');
        });

        log();
    } else if (input1 === "movie-this") {

        if (input2.length < 1) {

            input2 = "Mr. Nobody";
             
            
        };

        request("http://www.omdbapi.com/?t="+input2+"&apikey=963bcb75", function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var json = JSON.parse(body);
               
                console.log('Movie Information Results: ');
                console.log('--------------------------');
                console.log('Title: ' + json.Title);
                console.log('Year: ' + json.Year);
                console.log('Rated: ' + json.Rated);
                console.log('Country: ' + json.Country);
                console.log('Language: ' + json.Language);
                console.log('Director: ' + json.Director);
                console.log('Actors: ' + json.Actors);
                console.log('Plot: ' + json.Plot);
                console.log('imdbRating: ' + json.imdbRating);
                console.log('Rotten Tomatoes Rating: ' + json.tomatoRating);
                console.log('--------------------------');
            }
        })
        log();
    } else if (input1 === "do-what-it-says") {

        fs.readFile('random.txt', 'utf8', function (err, data) {
            if (err) throw err;

            var arr = data.split(',');

            input1 = arr[0].trim();
            input2 = arr[1].trim();
            run();

        });
        log();
    };

}