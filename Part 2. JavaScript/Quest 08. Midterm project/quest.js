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

class GamePresenter {
  #card;
  #viewGame;

  constructor(Card, Game, ViewGame) {
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

class ViewGame {
  #cardWrapperEl;
  #currentEl;
  #startBtn;
  #solveBtn;
  #scrambleBtn;

  constructor(cards) {
    this.#cardWrapperEl = document.querySelector('.game-cards');
    this.#startBtn = document.querySelector('.game-btns--start');
    this.#solveBtn = document.querySelector('.game-btns--solve');
    this.#scrambleBtn = document.querySelector('.game-btns--scramble');
    this.init(cards);
  }

  set currentEl(v) {
    this.#currentEl = v;
  }

  init(cards) {
    this.removeAllCards();
    this.renderCards(cards);
  }

  removeAllCards() {
    while (this.#cardWrapperEl.firstChild) {
      this.#cardWrapperEl.removeChild(this.#cardWrapperEl.firstChild);
    }
  }

  renderCards(arr) {
    arr.forEach(cardArr => {
      cardArr.forEach(card => {
        const cardEl = Utils.also(document.createElement('li'), it => {
          it.id = card.id;
          it.innerHTML = card.value;
          it.classList.add('game-card');
        })
        this.setStyle(cardEl, Utils.exportIndexArr(card));
        this.#cardWrapperEl.appendChild(cardEl);
      })
    })
  }

  setStyle(card, i) {
    const case1 = i[0] % 2 == 0 && i[1] % 2 == 0;
    const case2 = i[0] % 2 == 1 && i[1] % 2 == 1;

    if (card.innerHTML <= 15) {
      card.classList.add(case1 || case2 ? 'game-card--deep' : 'game-card--light');
    } else {
      card.classList.add('game-card--empty');
    }
  }

  addCardEvent(swapCallback) {
    for (const el of this.#cardWrapperEl.children) {
      el.addEventListener('click', swapCallback);
    }
  }

  addStartEvent(startCallback) {
    this.#startBtn.addEventListener('click', startCallback)
  }

  addSolveEvent(solveCallback) {
    this.#solveBtn.addEventListener('click', solveCallback)
  }

  addScrambleEvent(scrambleCallback) {
    this.#scrambleBtn.addEventListener('click', scrambleCallback)
  }

  updateView() {
    const emptyEl = document.querySelector('#card-3-3');
    const tempValue = this.#currentEl.innerHTML;
    const tempStyle = this.#currentEl.classList.value;
    const tempId = this.#currentEl.id;
    this.#currentEl.innerHTML = emptyEl.innerHTML;
    this.#currentEl.classList.value = emptyEl.classList.value;
    this.#currentEl.id = emptyEl.id;
    emptyEl.innerHTML = tempValue;
    emptyEl.classList.value = tempStyle;
    emptyEl.id = tempId;
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

class ViewRecord {
  #currentTimeEl;
  #recordsEl;
  #clearBtn;

  constructor(arr) {
    this.#currentTimeEl = document.querySelector('.record-time--current');
    this.#recordsEl = document.querySelector('.record-list');
    this.#clearBtn = document.querySelector('.record-btns--clear');
    this.init(arr);
  }

  get currentTime() {
    return this.#currentTimeEl.innerHTML;
  }

  init(arr) {
    arr.forEach((el, i) => {
      this.render(el, i);
    });
  }

  render(item, index) {
    const el = Utils.also(document.createElement('li'), it => {
      it.innerHTML = `${index + 1}번 째 기록: ${item}`;
    })
    this.#recordsEl.appendChild(el);
  }

  updateView(min, sec) {
    this.#currentTimeEl.innerHTML = `${min}m ${sec}s`;
  }

  removeAllRecord() {
    while (this.#recordsEl.firstChild) {
      this.#recordsEl.removeChild(this.#recordsEl.firstChild);
    }
  }

  addClearEvent(clearCallback) {
    this.#clearBtn.addEventListener('click', clearCallback);
  }
}

const PubSub = new PubSubFrame();
const card = new Card();
const game = new Game();
const viewGame = new ViewGame(card.all);
const record = new Record();
const viewRecord = new ViewRecord(record.list);
const recordPresenter = new RecordPresenter(record, viewRecord);
const gamePresenter = new GamePresenter(card, viewGame);
