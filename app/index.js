"use strict";
const angular = require("angular");
const _ = require("lodash");

const getNextGame = require("./get-next-game");
const calculateDifference = require("./calculate-difference");

angular.module("seahawks-countdown", ["foundation"]).controller("SeahawksCountdownCtrl", function($scope) {
    $scope.games = [
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

    const colSizes = {
        days: "small-2",
        hours: "small-3",
        minutes: "small-5",
        seconds: "small-12"
    };

    $scope.settings = {
        preseason: true,
        units: "days"
    };

    const updateOnce = _.once(updateTime);

    $scope.$watch("settings", () => {
        $scope.nextGame = getNextGame($scope.games, $scope.settings.preseason);
        $scope.countdown = calculateDifference($scope.nextGame.formattedDate, $scope.settings.units);
        $scope.settings.colSize = colSizes[$scope.settings.units];
        updateOnce();
    }, true);

    function updateTime() {
        requestAnimationFrame(updateTime);
        if (!$scope.$$phase) {
            $scope.$apply(
                () => $scope.countdown = calculateDifference($scope.nextGame.formattedDate, $scope.settings.units)
            );
        } else {
            $scope.countdown = calculateDifference($scope.nextGame.formattedDate, $scope.settings.units);
        }
    }
});

require("../index.scss");
require("foundation-apps/dist/js/foundation-apps"); 
require("foundation-apps/dist/js/foundation-apps-templates"); 