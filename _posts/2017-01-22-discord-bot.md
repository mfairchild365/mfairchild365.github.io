---
layout: post
title: "The Fairchild Image Factory (discord bot)"
description: ""
comments: true
---

I've always been an avid gamer. I vividly remember LAN parties in high school and late night binging sessions on games like Fallout 3 and Skyrim. It was an escape for me, and boy was it fun. Several years ago, probably around 2010, my friends and I had a Skype group chat where we talked about games, life, and dank memes. Then, once Skype went down hill we moved to a mumble server for voice chat and facebook for text chat. Then last year, we all jumped on board the [Discord](https://discordapp.com/) hype train.

Now that my life involves more "adulting", I have less time to play video games. Don't get me wrong, I still play them, but I just have less time. I've also found that more of my free time goes to side projects where I make silly software. I could say that these projects are an effort to improve and hone my skills as a developer, but I think it is just because I enjoy programming.

Needless to say, I was very excited to find out that discord had some wonderful APIs for creating bots. I immediately started to brainstorm ideas for a bot and landed on an idea that I thought would be very simple to implement. Thus, I created the Fairchild Image Factory bot, known on GitHub as [discord image bot](https://github.com/mfairchild365/discord-image-bot). 

When I first added it to our server, I quickly realized that I had to put rate limits on it. It was much too popular.

So, I thought I'd share it with the world.

## How do I add it to my server?

Feel free to [add it to your discord server](https://discordapp.com/api/oauth2/authorize?client_id=201798486201597954&scope=bot&permissions=0).

## What does the bot do?

The Fairchild Image Factory takes a command `\show-me {query}` and then randomly searches either [http://giphy.com/](http://giphy.com/) or [http://imgur.com/](http://imgur.com/) for an image matching the query, and posts it to the room. It is a simple concept but it can be very fun, probably because some of the results are either spot on or way off base.

As time went on, I added a few more features.

* `\knife-fight {@user}` - simulate a knife-fight with a given user
* `\sentiment [{@query}]` - perform sentiment analysis on the last post or a given string. It will tell if it was salty.
* `\show-me {query}` - as described above
* It might also reply "same" to random posts.

## How does it work?

Well, as I said, it is just a simple script that searches some common image hosting sites. But, if you want details:

* It is a PHP script
* It uses the [DiscordPHP](https://github.com/teamreflex/DiscordPHP) library
* Because the discord API is websocket based, a constant connection needs to be established between the bot and discord. This means that the script has to run as a daemon, which isn't very common for PHP. To accomplish this, I used the [pm2 process manager](http://pm2.keymetrics.io/).
* See the [bot's GitHUb repository](https://github.com/mfairchild365/discord-image-bot) for more details.
