import { describe, it, expect } from 'vitest';
import { pickableOperatorPool } from './randomPick';
import { sanitizedOperators, type ReducedSanitizedOperator } from './operators';

const mockOperators: Array<ReducedSanitizedOperator> = sanitizedOperators;

describe('pickableOperatorPool test', () => {
	it('attacker side only', () => {
		const result = pickableOperatorPool(mockOperators, 'attacker');
		expect(result.every((e) => e.role === 'Attacker')).toBeTruthy();
	});

	it('defender side only', () => {
		const result = pickableOperatorPool(mockOperators, 'defender');
		expect(result.every((e) => e.role === 'Defender')).toBeTruthy();
	});

	it('contain starter attacker operators', () => {
		const result = pickableOperatorPool(mockOperators, 'attacker', { hideStarter: false });
		expect(result.find((e) => e.id == 'striker')).toBeTruthy();
		expect(result.find((e) => e.id == 'sentry')).toBeFalsy();
		expect(result.filter((e) => e.id.startsWith('recruit_')).length).toBe(0);
	});

	it('hide starter attacker operators', () => {
		const result = pickableOperatorPool(mockOperators, 'attacker', { hideStarter: true });
		expect(result.find((e) => e.id == 'striker')).toBeFalsy();
		expect(result.find((e) => e.id == 'sentry')).toBeFalsy();
		expect(result.filter((e) => e.id.startsWith('recruit_')).length).toBe(0);
	});

	it('contain starter defender operators', () => {
		const result = pickableOperatorPool(mockOperators, 'defender', { hideStarter: false });
		expect(result.find((e) => e.id == 'striker')).toBeFalsy();
		expect(result.find((e) => e.id == 'sentry')).toBeTruthy();
		expect(result.filter((e) => e.id.startsWith('recruit_')).length).toBe(0);
	});

	it('hide starter defender operators', () => {
		const result = pickableOperatorPool(mockOperators, 'defender', { hideStarter: true });
		expect(result.find((e) => e.id == 'striker')).toBeFalsy();
		expect(result.find((e) => e.id == 'sentry')).toBeFalsy();
		expect(result.filter((e) => e.id.startsWith('recruit_')).length).toBe(0);
	});

	it('attacker side only with custom set', () => {
		const result = pickableOperatorPool(mockOperators, 'attacker', {
			hideStarter: false,
			customSet: ['amaru', 'thermite', 'clash', 'tachanka']
		});
		expect(result.length).toBe(2);
		expect(result.find((e) => e.id == 'amaru')).toBeTruthy();
		expect(result.find((e) => e.id == 'thermite')).toBeTruthy();
	});

	it('defender side only with custom set', () => {
		const result = pickableOperatorPool(mockOperators, 'defender', {
			hideStarter: false,
			customSet: ['amaru', 'thermite', 'clash', 'tachanka']
		});
		expect(result.length).toBe(2);
		expect(result.find((e) => e.id == 'clash')).toBeTruthy();
		expect(result.find((e) => e.id == 'tachanka')).toBeTruthy();
	});
});
