import r6operators from 'r6operators';
import type { Operator } from 'r6operators';

export type ReducedSanitizedOperator = Pick<Operator, 'id' | 'svg' | 'toSVG' | 'name' | 'role'>;

export const sanitizedOperators: Array<ReducedSanitizedOperator> = Object.values(r6operators)
	.filter((e) => typeof e.id === 'string')
	.map((e) => ({
		id: e.id,
		name: e.name,
		role: e.role,
		svg: e.svg,
		toSVG: e.toSVG
	}));
