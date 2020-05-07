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

class Utils {
	static also(v, block) {
		block(v);
		return v;
	}

	static exportIndexArr(v) {
		return v.id.split('-').splice(1, 2);
	}
}
