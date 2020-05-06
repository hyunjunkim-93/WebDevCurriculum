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
