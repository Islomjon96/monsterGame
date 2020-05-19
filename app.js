new Vue({
    el: '#app',
    data: {
        startedNewGame: false,
        userScore: 100,
        monsterScore: 100,
        historyActions: []
    },
    methods: {
        // Функция, которая выполняется при действии пользователя во время игры
        action: function (actionType) {
            let userPoint = this.randomNumber();

            // Если пользователь атакует монстра, то и монстр атакует в ответ и эти действия добавляются в массив истории
            if (actionType == 'attack') {
                this.monsterScore -= userPoint;
                this.addAction('Player hit the monster for ', userPoint, true);
                this.monsterHit();
                // Если пользователь атакует с большей силой монстра, то и монстр атакует в ответ и эти действия добавляются в массив истории
            } else if (actionType == 'specialAttack') {
                let hitHard = userPoint + 10;
                this.monsterScore -= hitHard;
                this.addAction('Player hit hard the monster for ', hitHard, true);
                this.monsterHit();
                // Если пользователь лечит себя, но при этом монстр не перестанет атаковать и эти действия добавляются в массив истории
            } else if (actionType == 'heal') {
                this.userScore += userPoint;
                if (this.userScore > 100) {
                    this.userScore = 100;
                }
                this.addAction('Player heals himself for ', userPoint, true);
                this.monsterHit();
            }
            // Каждый раз при действии пользователя проверяем выиграл ли кто-то или нет
            this.returnWinner();
            console.log(this.historyActions);
        },
        // Когда пользователь сдается, то приостанавливаем игру
        giveUp: function () {
            this.startedNewGame = false;
        },
        // Функция атаки монстра
        monsterHit: function () {
            let monsterPoint = this.randomNumber();
            this.userScore -= monsterPoint;
            this.addAction('Monster hit the player for ', monsterPoint, false);
        },
        // Функция добавления действий в общий массив
        addAction: function (actionText, actionPoint, isPlayer) {
            this.historyActions.unshift({
                text: actionText + actionPoint,
                isPlayer: isPlayer
            });
        },
        // Функция, которая проверяет выиграл ли кто-то или нет, если выиграл, то спрашивает продолжать или нет. В зависимости от ответа либо создается новая игра, либо пользователь сдается и игра приостанавливается 
        returnWinner: function () {
            if (this.userScore <= 0) {
                if (confirm('Monster wins! New Game?')) {
                    this.newGame();
                } else {
                    this.giveUp();
                }
            } else if (this.monsterScore <= 0) {
                if (confirm('You win! New Game?')) {
                    this.newGame();
                } else {
                    this.giveUp();
                }
            }
        },
        // Функция, которая позволяет нам вернуться к исходным нашим данным и запустить новую игру
        newGame: function () {
            this.userScore = 100;
            this.monsterScore = 100;
            this.historyActions = [];
        },
        // Функция, которая вернет рандомное число от 1 до 10
        randomNumber: function () {
            return Math.floor(Math.random() * 10) + 1;
        },
    }
})