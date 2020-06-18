const { isSameAB } = require('../../utils/index.js');

describe('isSameAB는', () => {
    it('두 인자가 같으면 true를 반환한다', () => {
        expect(isSameAB(1, 1)).toBeTruthy();
    })
    it('두 인자가 다르면 true를 반환한다', () => {
        expect(isSameAB(1, 2)).toBeFalsy();
    })
});
