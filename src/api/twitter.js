const Twit = require("twit");
const notifier = require("node-notifier");
const open = require("open");
const franc = require("franc");
const creds = require("../credentials")();

let T = new Twit({
  consumer_key: creds.apikey,
  consumer_secret: creds.apiSecretKey,
  access_token: creds.accessToken,
  access_token_secret: creds.accessTokenSecret
});

const searchTweets = () => {
  try {
    T.get(
      "search/tweets",
      { q: "#coronavirus", count: 2000 },
      (err, data, response) => {
        const tweets = data.statuses
          .map(tweet => `${tweet.text}`)
          .filter(tweet => (tweet = franc(tweet) === "eng" ? tweet : null))
          .filter(tweet => tweet.toLowerCase().includes("trump"));
        console.log(tweets);
        return tweets;
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Branched here
// const stream = T.stream('statuses/filter', { track: '#covid'})
// stream.on('tweet', (tweet) => {
//     console.log(tweet.text);
//     console.log('--------')
// })
