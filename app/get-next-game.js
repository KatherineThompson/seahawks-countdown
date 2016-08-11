"use strict";
const _ = require("lodash");
const moment = require("moment-timezone");

function getNextGame(allGames, isPreseason, currentDate) {
    const subsetGames = isPreseason ? allGames : _.filter(allGames, {preSeason: false});

    const nextGame =  _.find(
        subsetGames,
        game => moment.tz(game.date, "YYYY-MM-DD hh:mm a", "America/Los_Angeles").isAfter(currentDate)
    );

    if (!nextGame) {
        const err = new Error("There is no game in the future");
        err.currentDate = currentDate;
        throw err;
    }

    nextGame.formattedDate =
        moment(nextGame.date, "YYYY-MM-DD hh:mm a")
        .format("dddd, MMMM Do YYYY, h:mm a");
        
    return nextGame;
}

module.exports = getNextGame;