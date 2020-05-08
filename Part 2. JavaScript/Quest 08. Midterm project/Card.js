class Card {
	#default;

	get default() {
		return this.#default;
	}

	constructor() {
		this.#default = this.makeCards();
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

	isAroundEmpty(current, empty) {
		const firstAbs = Math.abs(current[0] - empty[0]);
		const secondAbs = Math.abs(current[1] - empty[1]);
		const result = firstAbs + secondAbs;
		return result == 1 ? true : false;
	}

	checkEdgeCase(cnt, empty) {
		if ((cnt + empty[0]) % 2 !== 0) {
			return true;
		} else {
			return false;
		}
	}

	getCnt([...arrLike]) {
		let cnt = 0;
		for (const [i, el] of arrLike.entries()) {
			const cardNum = el.innerHTML !== 'empty' ? Number(el.innerHTML) : null;

			for (let j = i + 1; j < arrLike.length; j += 1) {
				const nextCardNum = arrLike[j].innerHTML !== 'empty' ? Number(arrLike[j].innerHTML) : 10000;
				if (!cardNum) break;
				if (cardNum > nextCardNum) cnt += 1;
			}
		}
		return cnt;
	}

	checkPosition(viewCards) {
		if (viewCards[viewCards.length - 1].innerHTML !== 'empty') return;
		let result = true;
		this.#default.flat(2).forEach((card, i) => {
			if (card.value !== viewCards[i].innerHTML) result = false;
		})
		return result;
	}
}

class PresenterCard {
	#card;
	#viewCard;

	constructor(Card, ViewCard) {
		this.#card = Card;
		this.#viewCard = ViewCard;
		this.subscribeEvent();
	}

	subscribeEvent() {
		PubSub.subscribe('game_default', this.setCard());
		PubSub.subscribe('game_start', this.setStart());
		PubSub.subscribe('game_solve', this.setSolve());
		PubSub.subscribe('game_shuffle', this.shuffleCard());
		PubSub.subscribe('game_swap', this.swapCard());
	}

	setCard() {
		return () => {
			this.#viewCard.render(this.#card.default);
		}
	}

	setStart() {
		return () => {
			this.shuffleCard()();
		}
	}

	setSolve() {
		return () => {
			this.#viewCard.sort(this.#card.default);
		}
	}

	shuffleCard() {
		return () => {
			this.#viewCard.shuffle();
			const { emptyIndex } = this.getEmpty();
			const cnt = this.#card.getCnt(this.#viewCard.cardEls);
			const result = this.#card.checkEdgeCase(cnt, emptyIndex);

			if (!result) this.shuffleCard()();
		}
	}

	swapCard() {
		return e => {
			const { emptyEl, emptyIndex } = this.getEmpty();
			const targetIndex = Utils.exportIndexArr(e.target);
			const result = this.#card.isAroundEmpty(emptyIndex, targetIndex);

			if (result) {
				this.#viewCard.update(emptyEl, e.target);
				const done = this.#card.checkPosition(this.#viewCard.cardEls);
				if (done) PubSub.publish('game_done');
			}
		}
	}

	getEmpty() {
		const emptyEl = this.#viewCard.getEmptyEl();
		const emptyIndex = Utils.exportIndexArr(emptyEl);
		return { emptyEl, emptyIndex };
	}
}

class ViewCard {
	#parent;

	get cardEls() {
		return this.#parent.children;
	}

	constructor() {
		this.#parent = document.querySelector('.game-cards');
	}

	render(arr) {
		arr.forEach(cardArr => {
			cardArr.forEach(card => {
				const cardEl = Utils.also(document.createElement('li'), it => {
					it.id = card.id;
					it.innerHTML = card.value;
				})
				this.setStyle(cardEl, Utils.exportIndexArr(card));
				this.#parent.appendChild(cardEl);
			})
		})
	}

	sort(defaultCards) {
		defaultCards.flat(2).forEach((card, i) => {
			const currentCardEl = this.cardEls[i];
			currentCardEl.innerHTML = card.value;
			currentCardEl.classList.value = '';
			this.setStyle(currentCardEl, Utils.exportIndexArr(card));
		})
	}

	setStyle(card, i) {
		const case1 = i[0] % 2 == 0 && i[1] % 2 == 0;
		const case2 = i[0] % 2 == 1 && i[1] % 2 == 1;

		card.classList.add('game-card');
		if (card.innerHTML <= 15) {
			card.classList.add(case1 || case2 ? 'game-card--deep' : 'game-card--light');
		} else {
			card.classList.add('game-card--empty');
		}
	}

	getEmptyEl() {
		let result;
		for (const el of this.#parent.children) {
			if (el.innerHTML === 'empty') {
				result = el;
			}
		}
		return result;
	}

	update(empty, target) {
		const temp = target.innerHTML;
		const tempStyle = target.classList.value;
		target.innerHTML = empty.innerHTML;
		target.classList.value = empty.classList.value;
		empty.innerHTML = temp;
		empty.classList.value = tempStyle;
	}

	shuffle() {
		const cards = this.#parent.children;
		let index = cards.length;

		while (index !== 0) {
			const random = Math.floor(Math.random() * index);
			index -= 1;
			this.update(cards[index], cards[random]);
		}
	}
}
