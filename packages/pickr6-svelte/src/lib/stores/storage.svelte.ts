import { tick } from 'svelte';
import type { AppState } from './types';

export class LocalStorage<T> {
	#key: string;
	#version = $state(0);
	#listeners = 0;
	#value: T | undefined;
	readonly #initial: T | undefined;

	#handler = (e: StorageEvent) => {
		if (e.storageArea !== localStorage) return;
		if (e.key !== this.#key) return;

		this.#version += 1;
	};

	constructor(key: string, initial?: T) {
		this.#key = key;
		this.#value = initial;
		this.#initial = initial;

		if (typeof localStorage !== 'undefined') {
			if (localStorage.getItem(key) === null) {
				localStorage.setItem(key, JSON.stringify(initial));
			}
		}
	}

	get current(): T {
		this.#version;

		const root =
			typeof localStorage !== 'undefined'
				? JSON.parse(localStorage.getItem(this.#key) as any)
				: this.#value;

		const proxies = new WeakMap();

		const proxy = (value: unknown) => {
			if (typeof value !== 'object' || value === null) {
				return value;
			}

			let p = proxies.get(value);

			if (!p) {
				p = new Proxy(value, {
					get: (target, property) => {
						this.#version;
						return proxy(Reflect.get(target, property));
					},
					set: (target, property, value) => {
						this.#version += 1;
						Reflect.set(target, property, value);

						if (typeof localStorage !== 'undefined') {
							localStorage.setItem(this.#key, JSON.stringify(root));
						}

						return true;
					}
				});

				proxies.set(value, p);
			}

			return p;
		};

		if ($effect.tracking()) {
			$effect(() => {
				if (this.#listeners === 0) {
					window.addEventListener('storage', this.#handler);
				}

				this.#listeners += 1;

				return () => {
					tick().then(() => {
						this.#listeners -= 1;
						if (this.#listeners === 0) {
							window.removeEventListener('storage', this.#handler);
						}
					});
				};
			});
		}

		return proxy(root);
	}

	set current(value) {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(this.#key, JSON.stringify(value));
		}

		this.#version += 1;
	}

	reset() {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem(this.#key);
		}

		if (typeof localStorage !== 'undefined') {
			if (localStorage.getItem(this.#key) === null) {
				localStorage.setItem(this.#key, JSON.stringify(this.#initial));
			}
		}

		this.#value = this.#initial;
		this.#version += 1;
	}
}

export const appState = new LocalStorage<AppState>('pickr6-store', {
	ownedOperators: [],
	sets: [],
	options: {
		hideRecruit: false,
		side: 'defender'
	},
	selected: {
		spinnedOperatorId: null,
		selectedCustomSetId: null
	}
});
