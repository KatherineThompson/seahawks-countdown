"use strict";

const test = require("tape");
const moment = require("moment");
const calculateDifference = require("../app/calculate-difference");

test("calcDiff", t => {
    t.test("next game date is in the future", t => {
        t.test("the days are correct", t => {
            t.test("there are days", t => {
                t.plan(1);

                const futureDate = moment().add({days: 3, seconds: 5});

                t.equal(
                    calculateDifference(futureDate).days,
                    "03",
                    "the correct number of days are returned when there are days between the future date and now"
                );
            });

            t.test("there are not days", t => {
                t.plan(1);

                const tomorrow = moment().add(23, "hours");

                t.equal(
                    calculateDifference(tomorrow).days,
                    "00",
                    "the correct number of days are returned when there are no days between the future date and now"
                );
            });
        });

        t.test("the hours are correct", t => {
            t.test("there are hours", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 7, minutes: 2});

                t.equal(
                    calculateDifference(futureDate).hours,
                    "07",
                    "the correct number of hours are returned when there are hours between the future date and now"
                );
            });

            t.test("there are not hours", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 0, minutes: 2});

                t.equal(
                    calculateDifference(futureDate).hours,
                    "00",
                    "the correct number of hours are returned when there are no hours between the future date and now"
                );
            });
        });

        t.test("the minutes are correct", t => {
            t.test("there are minutes", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 4, minutes: 8, seconds: 45});

                t.equal(
                    calculateDifference(futureDate).minutes,
                    "08",
                    "the correct number of minutes are returned when there are minutes between the future date and now"
                );

            });

            t.test("there are not minutes", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 4, minutes: 0, seconds: 45});

                t.equal(
                    calculateDifference(futureDate).minutes,
                    "00",
                    "the correct number of mins are returned when there are no minutes between the future date and now"
                );

            });
        });

        t.test("the seconds are correct", t => {
            t.test("there are seconds", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 4, minutes: 13, seconds: 45, milliseconds: 999});

                t.equal(
                    calculateDifference(futureDate).seconds,
                    "45",
                    "the correct number of seconds are returned when there are seconds between the future date and now"
                );
            });

            t.test("there are not seconds", t => {
                t.plan(1);

                const futureDate = moment().add({days: 1, hours: 4, minutes: 13, seconds: 0, milliseconds: 999});

                t.equal(
                    calculateDifference(futureDate).seconds,
                    "00",
                    "the correct number of secs are returned when there are no seconds between the future date and now"
                );
            });
        });
    });

    t.test("there is no game in the future", t => {
        t.plan(1);

        const pastDate = moment("2016-07-01");

        try {
            calculateDifference(pastDate);
            t.fail("calculateDifference should have thrown an error as the game is in the past");
        } catch (err) {
            t.equal(
                err.nextGameDate,
                pastDate,
                "the error has the correct next game date" 
            );
        }
    });
});