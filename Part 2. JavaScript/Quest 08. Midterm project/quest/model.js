class Card {
    #all;

    constructor() {
        this.#all = this.makeCards();
    }

    get all() {
        return this.#all;
    }
    set all(card) {
        this.#all = card;
    }

    init() {
        this.#all = this.makeCards();
    }

    makeCards() {
        const cards = [];
        const it = this.cardNumMaker();

        for (let i = 0; i < 4; i += 1) {
            const arr = [];
            for (let j = 0; j < 4; j += 1) {
                const num = String(it.next().value);
                const card = {id: `card-${i}-${j}`, value: num};
                arr.push(card);
            }
            cards.push(arr);
        }
        return cards;
    }

    * cardNumMaker() {
        let num = 0;
        while (num !== 15) {
            yield num += 1;
        }
        yield 'empty';
    }

    findIndex(value) {
        let result = [];
        this.#all.forEach((arr, i) => {
            arr.forEach((card, j) => {
                if (card.value === value) {
                    result = [i, j];
                }
            })
        });
        return result;
    }

    isAroundEmpty(current, empty) {
        const firstAbs = Math.abs(current[0] - empty[0]);
        const secondAbs = Math.abs(current[1] - empty[1]);
        const result = firstAbs + secondAbs;
        return result == 1 ? true : false;
    }

    swap(card) {
        const current = this.findIndex(card.innerHTML);
        const empty = this.findIndex('empty');
        const result = this.isAroundEmpty(current, empty)

        if (result) {
            let currentCard = this.#all[current[0]][current[1]];
            let emptyCard = this.#all[empty[0]][empty[1]];
            const tempValue = currentCard.value;
            const tempId = currentCard.id;
            currentCard.value = emptyCard.value;
            currentCard.id = emptyCard.id;
            emptyCard.value = tempValue;
            emptyCard.id = tempId;
            return result;
        }
    }

    shuffle() {
        let index = this.#all.length;
        let index2 = this.#all.length;

        while (index !== 0) {
            const random = Math.floor(Math.random() * index);
            const random2 = Math.floor(Math.random() * index2);
            index -= 1;
            index2 -= 1;

            const temp = this.#all[index][index2];
            this.#all[index][index2] = this.#all[random][random2];
            this.#all[random][random2] = temp;
        }
    }

    checkPosition() {
        if (this.#all[3][3].value !== 'empty') {
            return;
        }
        let result = true;
        const it = this.cardNumMaker()
        this.#all.forEach(arr => {
            arr.forEach(v => {
                const num = it.next().value;
                if (v.value != num) {
                    result = false;
                }
            })
        })
        return result;
    }
}

class Game {
    #isStart = false;

    constructor() {
        this.subscribeEvent();
    }

    subscribeEvent() {
        PubSub.subscribe('stop_game', this.quit.bind(this));
        PubSub.subscribe('start_game', this.start.bind(this));
        PubSub.subscribe('check_shuffle', this.checkShuffle.bind(this));
    }

    quit() {
        if (this.#isStart) {
            this.#isStart = false;
            alert('Game Done!');
        }
    }

    start() {
        this.#isStart = true;
    }

    checkShuffle(value) {
        const { cards, empty } = value;
        let isEdgeCase = this.checkEdgeCase(cards, empty);
        PubSub.publish('result_shuffle', isEdgeCase);
    }

    checkEdgeCase(cards, empty) {
        const flatCard = cards.flat(2);
        let cnt = 0;
        for (let i = 0; i < flatCard.length; i += 1) {
            for (let j = i + 1; j < flatCard.length; j += 1) {
                if (flatCard[i].value > flatCard[j].value) {
                    cnt += 1;
                }
            }
        }
        if ((cnt + empty[0]) % 2 !== 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Record {
    #status = false;
    #list = [];
    #minutes;
    #seconds;

    constructor() {
        this.initTime();
        this.loadRecordList();
    }

    get minutes() {
        return this.#minutes;
    }
    get seconds() {
        return this.#seconds;
    }
    get list() {
        return this.#list;
    }
    get status() {
        return this.#status;
    }

    initTime() {
        this.#minutes = 0;
        this.#seconds = 0;
    }

    changeStatus() {
        this.#status = !this.#status;
    }

    setCurrentTime() {
        this.#seconds += 1;
        if (this.#seconds > 60) {
            this.#seconds = 0;
            this.#minutes += 1;
        }
    }

    saveRecord(record) {
        localStorage.setItem(`${localStorage.length}`, record);
        this.#list.push(record);
    }

    loadRecordList() {
        for (let i = 0; i < localStorage.length; i += 1) {
            const item = localStorage.getItem(`${i}`);
            this.#list.push(item);
        }
    }

    clearRecord() {
        localStorage.clear();
        this.#list = [];
    }
}
