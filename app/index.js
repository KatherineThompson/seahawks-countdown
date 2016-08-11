"use strict";
const angular = require("angular");
const _ = require("lodash");
const moment = require("moment");

const getNextGame = require("./get-next-game");
const calculateDifference = require("./calculate-difference");
const games = require("./games-2016");

angular.module("seahawks-countdown", ["foundation"]).controller("SeahawksCountdownCtrl", function($scope) {
    $scope.games = games

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
        const currentDate = moment();
        $scope.nextGame = getNextGame($scope.games, $scope.settings.preseason, currentDate);
        $scope.countdown = calculateDifference($scope.nextGame.formattedDate, $scope.settings.units);
        $scope.settings.colSize = colSizes[$scope.settings.units];
        updateOnce();
    }, true);

    function updateTime() {
        function updateCountdown() {
            $scope.countdown = calculateDifference($scope.nextGame.formattedDate, $scope.settings.units);
        }

        requestAnimationFrame(updateTime);

        if (!$scope.$$phase) {
            $scope.$apply(updateCountdown);
        } else {
            updateCountdown();
        }
    }
});

require("../index.scss");
require("foundation-apps/dist/js/foundation-apps"); 
require("foundation-apps/dist/js/foundation-apps-templates"); 