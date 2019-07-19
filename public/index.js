if (typeof CN === 'undefined') CN = {};

CN.agentType = {
    red: 'red',
    blue: 'blue',
    neutral: 'neutral',
    black: 'black'
};

var app = angular.module("codeNames", []);

angular.module("codeNames")
    .controller("gameController", function ($scope) {

        var dimension = 5;
        var wordsCount = dimension * dimension;
        var agentsCount = 8;

        init();

        function init() {
            var words = getRandomWords(CN.words, wordsCount);
            var cards = _.map(words, getCard);
            initAgents(cards);
            $scope.cards = _.chunk(cards, dimension);

            function getCard(word) {
                return {
                    word: word,
                    active: false,
                    selected: false,
                    opened: false,
                    agentType: null,
                }
            }

            function initAgents(cards) {
                var agentSettings = [
                    {type: CN.agentType.blue, count: agentsCount + 1}, // because they start first
                    {type: CN.agentType.red, count: agentsCount},
                    {type: CN.agentType.black, count: 1},
                    {type: CN.agentType.neutral, count: wordsCount - agentsCount - agentsCount - 1 - 1}, // all the rest
                ];
                var numbers = getUniqRandomNumbers(0, wordsCount, wordsCount);
                _.forEach(agentSettings, as => {
                    _.times(as.count, () => {
                        var number = numbers.pop();
                        cards[number].agentType = as.type;
                    })
                })
            }
        }

        $scope.doSmth = function (x) {

        };

        function getRandomWords(arr, count) {
            var numbers = getUniqRandomNumbers(0, CN.words.length, count);
            return _.map(numbers, x => arr[x]);
        }

        function getUniqRandomNumbers(from, to, length) {
            var numbers = [];
            while (numbers.length < length) {
                var number = _.random(from, to - 1);
                if (numbers.indexOf(number) < 0) {
                    numbers.push(number);
                }
            }
            return numbers;
        }
    });