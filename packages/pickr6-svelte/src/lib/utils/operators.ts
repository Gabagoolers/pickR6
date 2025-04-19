import r6operators from 'r6operators';

export const sanitizedOperators = Object.values(r6operators).filter(
	(e) => typeof e.id === 'string'
);
