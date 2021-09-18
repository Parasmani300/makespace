const expect = require('chai').expect;

const filename = 'input1.txt';

const {main} = require('../main');
             


describe('This is a test of the main function',() => {
    it('Length equals 11',()=>{
        const len = main(filename).length;
        expect(len).to.equal(11);
    })

    it('Gives the array',() => {
        expect(main(filename)).deep.equal(
                    [
        'C-Cave',
        'C-Cave',
        'INCORRECT_INPUT',
        'D-Tower',
        'G-Manison ',
        'G-Manison',
        'G-Manison',
        'NO_VACANT_ROOM',
        'D-Tower ',
        'NO_VACANT_ROOM',
        'INCORRECT_INPUT'
        ]);
            })

})

describe('This is a second test for the same',() => {
    it('Measures the length of the output array', () => {
        const len = main('input.txt').length;
        expect(len).to.equal(13);
    })

    it('Also takes a file input and returns the output array',() =>{
        expect(main('input.txt')).deep.equal([
            'C-Cave D-Tower G-Manison ',
            'C-Cave',
            'NO_VACANT_ROOM',
            'G-Manison',
            'D-Tower ',
            'C-Cave',
            'D-Tower',
            'INCORRECT_INPUT',
            'G-Manison C-Cave ',
            'C-Cave',
            'G-Manison ',
            'G-Manison',
            'NO_VACANT_ROOM'
          ])
    })
})
