class Game {
	#start;

	constructor() {
		this.setDefault();
		PubSub.subscribe('game_done', this.stop.bind(this));
	}

	setDefault() {
		PubSub.publish('game_default');
		this.#start = false;
	}

	run() {
		this.#start = true;
	}

	stop() {
		if (this.#start) {
			PubSub.publish('game_stop');
			this.#start = false;
			alert('game done!');
		}
	}

}

class PresenterGame {
	#game;
	#viewGame;

	constructor(Game, ViewGame) {
		this.#game = Game;
		this.#viewGame = ViewGame;
		this.#viewGame.addStartEvent(this.startCallback());
		this.#viewGame.addSolveEvent(this.solveCallback());
		this.#viewGame.addScrambleEvent(this.scrambleCallback());
		this.#viewGame.addSwapEvent(this.swapCallback());
	}

	startCallback() {
		return () => {
			PubSub.publish('game_start');
			this.#game.run();
		}
	}

	solveCallback() {
		return () => {
			PubSub.publish('game_solve');
		}
	}

	scrambleCallback() {
		return () => {
			PubSub.publish('game_shuffle');
		}
	}

	swapCallback() {
		return (e) => {
			PubSub.publish('game_swap', e);
		}
	}
}

class ViewGame {
	#startBtn;
	#solveBtn;
	#scrambleBtn;
	#swapBtns;

	constructor(cards) {
		this.#startBtn = document.querySelector('.game-btns--start');
		this.#solveBtn = document.querySelector('.game-btns--solve');
		this.#scrambleBtn = document.querySelector('.game-btns--scramble');
		this.#swapBtns = cards;
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

	addSwapEvent(swapCallback) {
		for (const el of this.#swapBtns) {
			el.addEventListener('click', swapCallback);
		}
	}
}
