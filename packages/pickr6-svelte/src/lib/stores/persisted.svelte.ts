import { browser } from '$app/environment';
import { persisted } from 'svelte-persisted-store';

export interface PickR6Store {
	ownedOperators: Array<string>;
	sets: Array<OperatorSet>;
}

export interface OperatorSet {
	id: string;
	name: string;
	date: Date;
	operators: string[];
}

export const appStore = persisted<PickR6Store>('pickr6_deprecated', {
	ownedOperators: ['clash', 'ash', 'castle', 'amaru'],
	sets: [
		{
			id: 'asd',
			name: 'Test set',
			date: new Date(),
			operators: ['tachanka']
		}
	]
});

export class LocalStore<T> {
	#value = $state<T>() as T;
	#key = '';

	constructor(key: string, value: T) {
		this.#key = key;
		this.#value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) {
				this.#value = this.deserialize(item);
			} else {
				localStorage.setItem(key, this.serialize(this.#value));
			}
		}
	}

	get value() {
		return this.#value;
	}

	set value(newValue: T) {
		console.debug(newValue);
		this.#value = newValue;
		if (browser) {
			localStorage.setItem(this.#key, this.serialize(this.#value));
		}
	}

	get key() {
		return this.#key;
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(value: string): T {
		return JSON.parse(value);
	}
}

export function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value);
}

export const pickr6Store = localStore<PickR6Store>('pickr6', {
	ownedOperators: ['clash'],
	sets: [
		{
			id: 'asd',
			name: 'Test set',
			date: new Date(),
			operators: ['tachanka']
		}
	]
});
