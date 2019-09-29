const SlackBot = require("slackbots");
const axios = require("axios");

const CHANNEL_NAME = 'qabot_hub'
const GREETINGS = 'Hi there, what do you want to explore?'
const DATA_NOT_AVAILABLE = ':scream: Data not available!!!'

const KEYWORD_JOKE = ' joke';
const KEYWORD_JOBS = ' jobs';
const KEYWORD_HELP = ' help';

const bot = new SlackBot({
    token: 'xoxb-15710008371-777026408800-CtbBH58ODppYFRHusogUdUkj',
    name: 'qabot'
})

//Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':question:'
    }
    bot.postMessageToChannel(CHANNEL_NAME, GREETINGS, params);
});

//Error Handler
bot.on('error', err => console.log(err));

//Message Handler
bot.on('message', data => {
    if (data.type != 'message') {
        return;
    }
    handleMessage(data.text);
});

// Response to data
function handleMessage(message) {
    if (message.includes(KEYWORD_JOKE)) {
        makeJoke();
    } else if (message.includes(KEYWORD_JOBS)) {
        reportJobs();
    } else if (message.includes(KEYWORD_HELP)) {
        runHelp();
    }
}

// Post an answer
function postAnswer(data) {
    const params = {
        icon_emoji: ':heavy_check_mark:'
    }
    bot.postMessageToChannel(CHANNEL_NAME, `:arrow_right: ${data}`, params);
}

// Tell a random joke (chucknorris jokes)
function makeJoke() {
    axios.get('http://api.icndb.com/jokes/random/')
        .then(res => {
            const joke = res.data.value.joke;
            postAnswer(joke);
        })
}

// Report test results from QA Jenkins
function reportJobs() {
    postAnswer(DATA_NOT_AVAILABLE + 'aaaaaaa ');
}

// Provide Help
function runHelp() {
    postAnswer('Commands:  Type `@qabot <question>` \n :black_small_square: Example: `@qabot Tell me about <keyword>`');
    postAnswer('Some available keywords: \'joke\', \'jobs\'');
}