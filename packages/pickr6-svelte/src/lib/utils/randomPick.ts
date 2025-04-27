import type { OperatorSide } from '$lib/stores/persisted.svelte';
import type { ReducedSanitizedOperator } from './operators';

type PickableOperatorPoolOptions = {
	hideStarter: boolean;
	customSet?: Array<string>;
};

const starterOperators = [
	'striker',
	'sentry',
	...['blue', 'green', 'orage', 'red', 'yellow'].map((e) => `recruit_${e}`)
];

const isStarterOpFunc = (x: ReducedSanitizedOperator) => starterOperators.includes(x.id);

export function pickableOperatorPool<T extends ReducedSanitizedOperator>(
	operators: Array<T>,
	side: OperatorSide,
	options?: PickableOperatorPoolOptions
): Array<T> {
	return operators
		.filter((e) => (options?.customSet ? options.customSet.includes(e.id) : true))
		.filter((e) => {
			const isStarter = isStarterOpFunc(e);
			return (options?.hideStarter ?? true) ? !isStarter : true;
		})
		.filter((e) => e.role.toLowerCase() === side)
		.filter((e) => (options?.customSet ? options.customSet.includes(e.id) : true));
}
