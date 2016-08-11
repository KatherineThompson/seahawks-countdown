"use strict";

const test = require("tape");
const getNextGame = require("../app/get-next-game");

test("getNextGame", t => {
    const games = [
        {
            opponent: "Kansas City Chiefs",
            date: "2016-08-13 1:30 pm",
            location: "Centurylink Field",
            preSeason: true
        },
        {
            opponent: "Minnesota Vikings",
            date: "2016-08-18 7:00 pm",
            location: "Centurylink Field",
            preSeason: true
        },
        {
            opponent: "Dallas Cowboys",
            date: "2016-08-25 7:30 pm",
            location: "Centurylink Field",
            preSeason: true
        },
        {
            opponent: "Oakland Raiders",
            date: "2016-09-01 7:00 pm",
            location: "Oakland Coliseum",
            preSeason: true
        },
        {
            opponent: "Miami Dolphins",
            date: "2016-09-11 1:05 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "Los Angeles Rams",
            date: "2016-09-18 1:05 pm",
            location: "Los Angeles Memorial Coliseum",
            preSeason: false
        },
        {
            opponent: "San Francisco 49ers",
            date: "2016-09-25 1:05 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "New York Jets",
            date: "2016-10-02 10:00 am",
            location: "Metlife Stadium",
            preSeason: false
        },
        {
            opponent: "Atlanta Falcons",
            date: "2016-10-16 1:25 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "Arizona Cardinals",
            date: "2016-10-23 5:30 pm",
            location: "University of Phoenix Stadium",
            preSeason: false
        },
        {
            opponent: "New Orleans Saints",
            date: "2016-10-30 10:00 am",
            location: "Mercedes-Benz Superdome",
            preSeason: false
        },
        {
            opponent: "Buffalo Bills",
            date: "2016-11-07 5:30 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "New England Patriots",
            date: "2016-11-13 5:30 pm",
            location: "Gillete Stadium",
            preSeason: false
        },
        {
            opponent: "Philadelphia Eagles",
            date: "2016-11-20 1:25 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "Tampa Bay Buccaneers",
            date: "2016-11-27 1:05 pm",
            location: "Raymond James Stadium",
            preSeason: false
        },
        {
            opponent: "Carolina Panthers",
            date: "2016-12-04 5:30 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "Green Bay Packers",
            date: "2016-12-11 1:25 pm",
            location: "Lambeau Field",
            preSeason: false
        },
        {
            opponent: "Los Angeles Raiders",
            date: "2016-12-15 5:25 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "Arizona Cardinals",
            date: "2016-12-24 1:25 pm",
            location: "Centurylink Field",
            preSeason: false
        },
        {
            opponent: "San Francisco 49ers",
            date: "2017-01-01 1:25 pm",
            location: "Levi's Stadium",
            preSeason: false
        }
    ];
    t.test("works with no current date passed", t => {
        t.plan(1);
        const nextGame = {
            opponent: "Kansas City Chiefs",
            date: "2016-08-13 1:30 pm",
            location: "Centurylink Field",
            preSeason: true,
            formattedDate: "Saturday, August 13th 2016, 01:30 pm"
        };
        
        t.deepEqual(getNextGame(games, true), nextGame, "the correct game is returned when no current date is passed");
    });

    t.test("works for a game in the middle", t => {
        t.plan(1);
        const nextGame = {
            opponent: "Miami Dolphins",
            date: "2016-09-11 1:05 pm",
            location: "Centurylink Field",
            preSeason: false,
            formattedDate: "Sunday, September 11th 2016, 01:05 pm"
        };
        
        t.deepEqual(
            getNextGame(games, true, "2016-09-08 3:00 pm"),
            nextGame,
            "the correct game is returned when a current date in future is passed"
        );
    });

    t.test("works for a game at the end", t => {
        t.plan(1);
        const nextGame = {
            opponent: "San Francisco 49ers",
            date: "2017-01-01 1:25 pm",
            location: "Levi's Stadium",
            preSeason: false,
            formattedDate: "Sunday, January 1st 2017, 01:25 pm"
        };
        
        t.deepEqual(
            getNextGame(games, true, "2017-01-01 3:00 am"),
            nextGame,
            "the correct game is returned when no current date is passed"
        );
    });

    t.test("there is no game in the future", t => {
        t.plan(1);

        try {
            getNextGame(games, true, "2017-01-01 8:00 pm");
            t.fail("getNextGame should have thrown an error since there is no game in the future");
        } catch (error) {
            t.equal(
                error.currentDate,
                "2017-01-01 8:00 pm",
                "getNextGame throws the correct error when there is no game in the future"
            );
        }
    });
});
