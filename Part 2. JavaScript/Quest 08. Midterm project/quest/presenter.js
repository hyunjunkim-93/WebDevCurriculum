class RecordPresenter {
    #record;
    #viewRecord;
    #recordInterval;

    constructor(Record, ViewRecord) {
        this.#record = Record;
        this.#viewRecord = ViewRecord;
        this.subscribeEvent();
        this.#viewRecord.addClearEvent(this.clearCallback());
    }

    subscribeEvent() {
        PubSub.subscribe('start_game', this.startRecord.bind(this));
        PubSub.subscribe('stop_game', this.stopRecord.bind(this));
    }

    startRecord() {
        this.#record.initTime();
        this.#record.changeStatus();
        this.#recordInterval = setInterval(this.updateTime.bind(this), 1000);
    }

    stopRecord() {
        if (this.#record.status) {
            this.#record.changeStatus();
            clearInterval(this.#recordInterval);
            const currentTime = this.#viewRecord.currentTime;
            this.#viewRecord.render(currentTime, this.#record.list.length);
            this.#record.saveRecord(currentTime);
        }
    }

    updateTime() {
        this.#record.setCurrentTime();
        this.#viewRecord.updateView(this.#record.minutes, this.#record.seconds);
    }

    clearCallback() {
        return () => {
            this.#viewRecord.removeAllRecord();
            this.#record.clearRecord();
        }
    }
}

class GamePresenter {
    #card;
    #viewGame;

    constructor(Card, ViewGame) {
        this.#card = Card;
        this.#viewGame = ViewGame;
        this.initEvent();
        this.subscribeEvent();
    }

    initEvent() {
        this.#viewGame.addCardEvent(this.swapCallback());
        this.#viewGame.addStartEvent(this.startCallback());
        this.#viewGame.addSolveEvent(this.solveCallback());
        this.#viewGame.addScrambleEvent(this.scrambleCallback());
    }

    subscribeEvent() {
        PubSub.subscribe('result_shuffle', this.updateShuffle.bind(this));
    }

    swapCallback() {
        return e => {
            const result = this.#card.swap(e.target);
            if (result) {
                this.#viewGame.currentEl = e.target;
                this.#viewGame.updateView(result);
                const checked = this.#card.checkPosition();
                checked ? PubSub.publish('stop_game') : null;
            }
        };
    }

    startCallback() {
        return () => {
            PubSub.publish('start_game');
            this.shuffleLogic();
            this.#viewGame.addCardEvent(this.swapCallback());
        }
    }

    solveCallback() {
        return () => {
            this.#card.init();
            this.#viewGame.init(this.#card.all);
            this.#viewGame.addCardEvent(this.swapCallback());
        }
    }

    scrambleCallback() {
        return () => {
            this.shuffleLogic();
            this.#viewGame.addCardEvent(this.swapCallback());
        }
    }

    shuffleLogic() {
        this.#card.shuffle();
        const empty = this.#card.findIndex('empty');
        PubSub.publish('check_shuffle', { cards: this.#card.all, empty });
    }

    updateShuffle(result) {
        if (result) {
            this.#viewGame.init(this.#card.all);
        } else {
            this.shuffleLogic();
        }
    }
}
