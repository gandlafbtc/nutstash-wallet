import { describe, it, expect } from 'vitest';
import { removeDuplicatesFromArray } from "./comp/util/walletUtils";

describe('test remove from array', () => {
	it('removes 1,2,2,3', () => {
		expect(removeDuplicatesFromArray([1,1,2,2,2,3,3,4])).toEqual([1,2,3,4]);
	});
});