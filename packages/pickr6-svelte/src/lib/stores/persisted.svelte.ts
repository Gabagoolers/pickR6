import { browser } from '$app/environment';

export type OperatorSide = 'attacker' | 'defender';

export interface PickR6Store {
	ownedOperators: Array<string>;
	sets: Array<OperatorSet>;
	options: {
		hideRecruit: boolean;
		side: OperatorSide;
	};
}

export interface OperatorSet {
	id: string;
	name: string;
	date: Date | string;
	operators: string[];
}

interface JSONStructureLocalStore<T> {
	store: T;
	version: number;
}

export class LocalStore<T> {
	#value = $state<T>() as T;
	#key = '';
	#storage: Storage;
	#version = 1;

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

		$effect(() => {
			this.#storage.setItem(this.#key, this.serialize(this.#value));
		});
	}

	get value() {
		return this.#value;
	}

	get key() {
		return this.#key;
	}

	get version() {
		return this.#version;
	}

	serialize(value: T): string {
		return JSON.stringify({
			store: value,
			version: this.#version
		});
	}

	deserialize(value: string): T {
		const v: JSONStructureLocalStore<T> = JSON.parse(value);

		if (v.version !== this.#version) {
			console.error('version mismatch');
		}

		return v.store;
	}

	reset() {
		this.#storage.removeItem(this.#key);
	}
}

export function localStore<T>(key: string, value: T, storage: Storage = localStorage) {
	return new LocalStore(key, value, storage);
}

export function getPickr6Store() {
	return localStore<PickR6Store>('pickr6', {
		ownedOperators: [],
		sets: [],
		options: {
			hideRecruit: false,
			side: 'attacker'
		}
	});
}

interface SpinnedStore {
	spinnedOperatorId: string | null;
}

export function getSpinnedStore() {
	return localStore<SpinnedStore>(
		'pickr6_spinned',
		{
			spinnedOperatorId: null
		},
		sessionStorage
	);
}
