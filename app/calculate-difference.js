"use strict";
const moment = require("moment");
const formatCountdown = require("./format-countdown");
const _ = require("lodash");

function calculateDifference(nextGameDate, countdownUnits) {
    const now = moment();
    const gameDate = moment.isMoment(nextGameDate) ?
        nextGameDate :
        moment.tz(nextGameDate, "dddd, MMMM Do YYYY, hh:mm a", "America/Los_Angeles");

    if (gameDate.diff(now) < 0) {
        const err = new Error("There is no game in the future");
        err.nextGameDate = gameDate;
        throw err;
    }

    const allUnits = ["days", "hours", "minutes", "seconds"];
    const firstUnitIndex = _.findIndex(allUnits, unit => unit === countdownUnits);
    const units = _.slice(allUnits, firstUnitIndex);

    const difference =  {};

    _.forEach(units, (unit, index) => {
        if (index === 0) {
            difference[unit] = gameDate.diff(now, unit);
        } else {
            const previousUnit = units[index - 1];
            difference[unit] = gameDate.subtract(difference[previousUnit], previousUnit).diff(now, unit);
        }
    });

    return formatCountdown(difference);
}

module.exports = calculateDifference;