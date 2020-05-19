new Vue({
    el: '#app',
    data: {
        startedNewGame: false,
        userScore: 100,
        monsterScore: 100,
        actionAmount: 0,
        userTotal: 0,
        monsterTotal: 0,
        canUseSpecialAttack: true,
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
                this.checkUsingSpecialAttack();
                // Если пользователь атакует с большей силой монстра, то и монстр атакует в ответ и эти действия добавляются в массив истории
            } else if (actionType == 'specialAttack') {
                if (this.canUseSpecialAttack) {
                    this.canUseSpecialAttack = false;
                    this.actionAmount = 0;
                    let hitHard = userPoint + 10;
                    this.monsterScore -= hitHard;
                    this.addAction('Player hit hard the monster for ', hitHard, true);
                    this.monsterHit();
                } else {
                    alert(`It is ${3 - this.actionAmount} simple actions before using SPECIAL ATTACK again`)
                }
                // Если пользователь лечит себя, но при этом монстр не перестанет атаковать и эти действия добавляются в массив истории
            } else if (actionType == 'heal') {
                this.userScore += userPoint;
                if (this.userScore > 100) {
                    this.userScore = 100;
                }
                this.addAction('Player heals himself for ', userPoint, true);
                this.monsterHit();
                this.checkUsingSpecialAttack();
            }
            // Каждый раз при действии пользователя проверяем выиграл ли кто-то или нет
            this.returnWinner();
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
        // Функция проверки использования специальной атаки
        checkUsingSpecialAttack: function () {
            this.actionAmount += 1;
            if (this.actionAmount === 3) {
                this.canUseSpecialAttack = true;
            }
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
                if (confirm('Monster wins! Call new life?')) {
                    this.monsterTotal += 1;
                    this.newUser();
                } else {
                    this.giveUp();
                }
            } else if (this.monsterScore <= 0) {
                if (confirm('You win this round! Call new monster?')) {
                    this.userTotal += 1;
                    this.newMonster();
                } else {
                    this.giveUp();
                }
            }
        },
        // Функция, которая позволяет нам вернуться к исходным нашим данным и запустить новую игру
        newGame: function () {
            this.userScore = 100;
            this.monsterScore = 100;
            this.actionAmount = 0;
            this.userTotal = 0;
            this.monsterTotal = 0;
            this.canUseSpecialAttack = true;
            this.historyActions = [];
        },
        // Функция вызова нового пользователя
        newUser: function () {
            this.userScore = 100;
        },
        // Функция вызова нового монстра
        newMonster: function () {
            this.monsterScore = 100;
        },
        // Функция, которая вернет рандомное число от 1 до 10
        randomNumber: function () {
            return Math.floor(Math.random() * 10) + 1;
        },
    }
})