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
            let monsterPoint = this.randomNumber();
            let userPoint = this.randomNumber();
            this.userScore -= monsterPoint;

            // Если пользователь атакует монстра, то и монстр атакует в ответ и эти действия добавляются в массив истории
            if (actionType == 'attack') {
                this.monsterScore -= userPoint;
                this.historyActions.unshift({
                    userAction: `Player hit the monster for ${userPoint}`,
                    monsterAction: `Monster hit the player for ${monsterPoint}`
                });
                // Если пользователь атакует с большей силой монстра, то и монстр атакует в ответ и эти действия добавляются в массив истории
            } else if (actionType == 'specialAttack') {
                let hitHard = userPoint + 10;
                this.monsterScore -= hitHard;
                this.historyActions.unshift({
                    userAction: `Player hit hard the monster for ${hitHard}`,
                    monsterAction: `Monster hit the player for ${monsterPoint}`
                });
                // Если пользователь лечит себя, но при этом монстр не перестанет атаковать и эти действия добавляются в массив истории
            } else if (actionType == 'heal') {
                this.userScore += userPoint;
                if (this.userScore > 100) {
                    this.userScore = 100;
                }
                this.historyActions.unshift({
                    userAction: `Player heals himself for ${userPoint}`,
                    monsterAction: `Monster hit the player for ${monsterPoint}`
                });
            }
            // Каждый раз при действии пользователя проверяем выиграл ли кто-то или нет
            this.returnWinner();
        },
        // Когда пользователь сдается, то приостанавливаем игру
        giveUp: function () {
            this.startedNewGame = false;
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