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

class PresenterRecord {
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
		PubSub.subscribe('game_start', this.startRecord());
		PubSub.subscribe('game_stop', this.stopRecord());
	}

	startRecord() {
		return () => {
			this.#record.initTime();
			this.#record.changeStatus();
			this.#recordInterval = setInterval(this.updateTime.bind(this), 1000);
		}
	}

	stopRecord() {
		return () => {
			if (this.#record.status) {
				this.#record.changeStatus();
				clearInterval(this.#recordInterval);
				const currentTime = this.#viewRecord.currentTime;
				this.#viewRecord.render(currentTime, this.#record.list.length);
				this.#record.saveRecord(currentTime);
			}
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
