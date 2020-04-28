class PubSubFrame {
  #subscribers = {};

  publish(event, data) {
    if (!this.#subscribers[event]) return;

    this.#subscribers[event]
      .forEach(subscriberCallback => subscriberCallback(data));
  }

  subscribe(event, callback) {
    if (!this.#subscribers[event]) {
      this.#subscribers[event] = [];
    }

    this.#subscribers[event].push(callback);
  }
}
const PubSub = new PubSubFrame();

class PuzzleGame {
  #cards = [];
  #parentNode;
  #isStart;

  constructor(length) {
    this.#cards = this.makeCardArr(length);
    this.#parentNode = document.querySelector('.game-cards');
    this.init();
    this.subscribeOptions();
  }

  init() {
    this.render(this.#cards);
    this.addEvent();
  }

  makeCardArr(length) {
    const arr = [];
    let num = 1;

    for (let i = 0; i < length; i += 1) {
      const cardArr = [];

      for (let j = 0; j < length; j += 1) {
        cardArr.push(num);
        num += 1;
        if (num == 16) {
          cardArr.push('empty');
          break;
        }
      }

      arr.push(cardArr);
    }
    return arr;
  }

  render(cards) {
    cards.forEach((rowsCards, columnNum) => {
      rowsCards.forEach((value, rowNum) => {
        const card = document.createElement('li');
        card.id = `card-${columnNum}-${rowNum}`;
        this.setStyle(card);
        this.setCardPosition(card, { columnNum, rowNum });
        this.setCardContent(card, value);
        this.#parentNode.appendChild(card);
      });
    });
  }

  // TODO
  setStyle(card) {
    card.classList.add('game-card');
    const indexArr = card.id.split('-').splice(1, 2);
    if (indexArr[0] % 2 == 0 && indexArr[1] % 2 == 1) {
      card.classList.add('game-card--light');
    }
    if (indexArr[0] % 2 == 1 && indexArr[1] % 2 == 0) {
      card.classList.add('game-card--light');
    }
    if (indexArr[0] % 2 == 0 && indexArr[1] % 2 == 0) {
      card.classList.add('game-card--deep');
    }
    if (indexArr[0] % 2 == 1 && indexArr[1] % 2 == 1) {
      card.classList.add('game-card--deep');
    }
    if (card.id == 'card-3-3') {
      card.classList.add('game-card--empty');
    }
  }

  setCardContent(card, value) {
    card.innerHTML = value;
  }

  setCardPosition(card, target) {
    const top = (target.columnNum * 80 + 1) + (target.columnNum * 1);
    const left = (target.rowNum * 80 + 1) + (target.rowNum * 1);
    card.style.top = `${top}px`;
    card.style.left = `${left}px`
  }

  addEvent() {
    for (const cardEl of this.#parentNode.children) {
      this.onCardSwap(cardEl);
      this.onAnswerCheck(cardEl);
    }
  }

  onCardSwap(cardEl) {
    cardEl.addEventListener('click', e => {
      const targetIndexArr = e.target.id.split('-').splice(1, 2);
      const { emptyEl, emptyIndexArr } = this.findEmptyInfo();
      if (this.isAroundEmpty(targetIndexArr, emptyIndexArr)) {
        this.changeNode(emptyEl, e.target);
      } else {
        return;
      }
    })
  }

  // TODO
  onAnswerCheck(cardEl) {
    cardEl.addEventListener('click', () => {
      let answerCnt = 0;
      this.#cards.forEach((rowsCards, columnNum) => {
        if (answerCnt > 1) return;
        rowsCards.forEach((_, rowNum) => {
          const el = document.querySelector(`#card-${columnNum}-${rowNum}`);
          if (this.#cards[columnNum][rowNum] != Number(el.innerHTML)) {
            answerCnt += 1;
          }
        });
      });
      if (answerCnt == 1 && this.#isStart) {
        PubSub.publish('game_stop');
        this.#isStart = false;
        alert('게임 종료');
      }
    })
  }

  findEmptyInfo() {
    let emptyIndexArr;
    let emptyEl;
    for (const cardEl of this.#parentNode.children) {
      if (cardEl.innerHTML == 'empty') {
        emptyEl = cardEl;
        emptyIndexArr = cardEl.id.split('-').splice(1, 2);
      }
    }
    return { emptyEl, emptyIndexArr };
  }

  isAroundEmpty(targetIndex, emptyIndex) {
    const result = Math.abs(targetIndex[0] - emptyIndex[0]) + Math.abs(targetIndex[1] - emptyIndex[1]);
    return result == 1 ? true : false;
  }

  changeNode(emptyEl, targetEl) {
    let temp = {};
    temp.id = targetEl.id;
    temp.left = targetEl.style.left;
    temp.top = targetEl.style.top;
    
    targetEl.id = emptyEl.id;
    targetEl.style.left = emptyEl.style.left;
    targetEl.style.top = emptyEl.style.top;

    emptyEl.id = temp.id;
    emptyEl.style.left = temp.left;
    emptyEl.style.top = temp.top;
  }

  shuffleCard() {
    let currentIndex = this.#cards.length;
    let currentIndex2 = this.#cards.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      const randomIndex2 = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      currentIndex2 -= 1;

      const currentEl = document.querySelector(`#card-${currentIndex}-${currentIndex2}`);
      const randomEl = document.querySelector(`#card-${randomIndex}-${randomIndex2}`);

      this.changeNode(currentEl, randomEl);
    }
  }

  removeAllCards() {
    while (this.#parentNode.firstChild) {
      this.#parentNode.removeChild(this.#parentNode.firstChild);
    }
  }

  subscribeOptions() {
    PubSub.subscribe('game_start', () => {
      this.shuffleCard();
      this.#isStart = true;
      PubSub.publish('timer_start');
    })
    PubSub.subscribe('game_scramble', () => {
      this.shuffleCard();
    })
    PubSub.subscribe('game_solve', () => {
      this.removeAllCards();
      this.init();
    })
  }
}
const puzzleGame = new PuzzleGame(4);

class GameOptions {
  #startBtn;
  #solveBtn;
  #scrambleBtn;

  constructor() {
    this.#startBtn = document.querySelector('.game-btns--start');
    this.#solveBtn = document.querySelector('.game-btns--solve');
    this.#scrambleBtn = document.querySelector('.game-btns--scramble');
    this.addEvent();
  }

  addEvent() {
    this.#startBtn.addEventListener('click', () => {
      PubSub.publish('game_start');
    });
    this.#scrambleBtn.addEventListener('click', () => {
      PubSub.publish('game_scramble');
    });
    this.#solveBtn.addEventListener('click', () => {
      PubSub.publish('game_solve');
    });
  }
}
const gameOptions = new GameOptions();

class GameRecord {
  #currentTimeEl;
  #recordListEl;
  #timeRecordList = [];
  #minutes = 0;
  #seconds = 0;
  #interval;
  #clearBtn;

  constructor() {
    this.#currentTimeEl = document.querySelector('.record-time--current');
    this.#recordListEl = document.querySelector('.record-list');
    this.#clearBtn = document.querySelector('.record-btns--clear');
    this.addEvent();
    this.subscribeOptions();
    this.loadRecordList();
  }

  setCurrentTime() {
    this.#seconds += 1;
    if (this.#seconds > 60) {
      this.#seconds = 0;
      this.#minutes += 1;
    }
    this.#currentTimeEl.innerHTML = `${this.#minutes}m ${this.#seconds}s`
  }

  subscribeOptions() {
    PubSub.subscribe('timer_start', () => {
      this.#currentTimeEl.innerHTML = '게임 기록';
      this.initRecord();
      this.#interval = setInterval(this.setCurrentTime.bind(this), 1000);
    })
    PubSub.subscribe('game_stop', () => {
      clearInterval(this.#interval);
      const record = this.#currentTimeEl.innerHTML
      this.saveRecord(record);
      this.#timeRecordList.push(record);
      this.renderRecord();
    })
  }

  initRecord() {
    this.#seconds = 0;
    this.#minutes = 0;
  }

  saveRecord(record) {
    localStorage.setItem(localStorage.length, record);
  }

  loadRecordList() {
    for (let i = 0; i < localStorage.length; i += 1) {
      const item = localStorage.getItem(i);
      this.#timeRecordList.push(item);
      this.renderRecord();
    }
  }

  renderRecord() {
    const timeRecordEl = document.createElement('li');
    const index = this.#timeRecordList.length - 1;
    timeRecordEl.innerHTML = `${index + 1}번 째 기록: ${this.#timeRecordList[index]}`;
    this.#recordListEl.appendChild(timeRecordEl);
  }

  addEvent() {
    this.#clearBtn.addEventListener('click', () => {
      this.clearRecordList();
    })
  }

  clearRecordList() {
    localStorage.clear();
    this.#timeRecordList = [];
    this.removeAllRecord();
  }

  removeAllRecord() {
    while (this.#recordListEl.firstChild) {
      this.#recordListEl.removeChild(this.#recordListEl.firstChild);
    }
  }
}
const gameRecord = new GameRecord();
