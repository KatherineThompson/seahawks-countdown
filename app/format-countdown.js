"use strict";

const _ = require("lodash");

function formatCountdown(countdown) {
    _.forEach(countdown, (num, key) => countdown[key] = _(num).padStart(2, "0"));
    return countdown;
}

module.exports = formatCountdown;