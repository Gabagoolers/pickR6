import { browser } from '$app/environment';
import { persisted } from 'svelte-persisted-store';

export interface PickR6Store {
	ownedOperators: Array<string>;
	sets: Array<OperatorSet>;
}

export interface OperatorSet {
	id: string;
	name: string;
	date: Date | string;
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
	#storage: Storage;

	constructor(key: string, value: T, storage: Storage) {
		this.#key = key;
		this.#value = value;
		this.#storage = storage;

		if (browser) {
			const item = this.#storage.getItem(key);
			if (item) {
				this.#value = this.deserialize(item);
			} else {
				this.#storage.setItem(key, this.serialize(this.#value));
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
			this.#storage.setItem(this.#key, this.serialize(this.#value));
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

export function localStore<T>(key: string, value: T, storage: Storage = localStorage) {
	return new LocalStore(key, value, storage);
}

export const pickr6Store = localStore<PickR6Store>('pickr6', {
	ownedOperators: [],
	sets: []
});

interface SpinnedStore {
	spinnedOperatorId: string | null;
}

export const spinnedStore = localStore<SpinnedStore>(
	'pickr6_spinned',
	{
		spinnedOperatorId: null
	},
	sessionStorage
);
