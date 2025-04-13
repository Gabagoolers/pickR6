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

export const appStore = persisted<PickR6Store>('pickr6', {
	ownedOperators: ['clash', 'ash', 'castle'],
	sets: [
		{
			id: 'asd',
			name: 'TEst',
			date: new Date(),
			operators: ['asd']
		}
	]
});
