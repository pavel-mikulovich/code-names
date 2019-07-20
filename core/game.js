var _ = require('lodash');
var cnWords = require('./words');

var game = {
    cards: null
};

var service = {
    agentType: {
        red: 'red',
        blue: 'blue',
        neutral: 'neutral',
        black: 'black'
    },
    resetGame: () => {
        var dimension = 5;
        var wordsCount = dimension * dimension;
        var agentsCount = 8;

        var words = getRandomWords(cnWords.words, wordsCount);
        var cards = _.map(words, getCard);
        initAgents(cards);
        game.cards = cards;

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
                {type: service.agentType.blue, count: agentsCount + 1}, // because they start first
                {type: service.agentType.red, count: agentsCount},
                {type: service.agentType.black, count: 1},
                {type: service.agentType.neutral, count: wordsCount - agentsCount - agentsCount - 1 - 1}, // all the rest
            ];
            var numbers = getUniqRandomNumbers(0, wordsCount, wordsCount);
            _.forEach(agentSettings, as => {
                _.times(as.count, () => {
                    var number = numbers.pop();
                    cards[number].agentType = as.type;
                })
            });
            return cards;
        }

        function getRandomWords(arr, count) {
            var numbers = getUniqRandomNumbers(0, arr.length, count);
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
    },
    getCards: () => {
        return game.cards;
    }
};

module.exports = service;