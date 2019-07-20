var app = angular.module("codeNames", []);

angular.module("codeNames")
    .controller("gameController", function ($scope, $http) {

        // var socket = io();
        var dimension = 5;
        var cards;

        init();

        function init() {
            initCards();
        }

        function initCards() {
            $http.get('api/cards').then(function(res) {
                cards = res.data;
                $scope.cards = _.chunk(cards, dimension);
            });
        }

        $scope.reset = function () {
            $http.post('api/reset')
                .then(initCards);
        };

        $scope.showAll = function () {
            _.forEach(cards, c => c.opened = true);
        };
    });