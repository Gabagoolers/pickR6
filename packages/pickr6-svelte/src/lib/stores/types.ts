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

export type OperatorSide = 'attacker' | 'defender';

export interface SpinnedStore {
	spinnedOperatorId: string | null;
	selectedCustomSetId: string | null;
}

export type AppState = PickR6Store & {
	selected: SpinnedStore;
};
