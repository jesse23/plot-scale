/**
 * Test module
 */

// Module
import * as Parser from '../src/Parser.js';
import * as assert from 'assert';

// Suite
describe('Test Parser', function() {

    it('Parse type mapping rule', function() {
        // Clause
        let clause = "B:A";

        // Result
        let ruleObj = {
            tar: {
                type: 'B',
            },
            src: {
                type: 'A',
            }
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse attribute mapping rule', function() {
        // Clause
        let clause = "tar.second:Object.1";

        // Result
        let ruleObj = {
            tar: {
                type: 'tar',
                attr: 'second'
            },
            src: {
                type: 'Object',
                attr: '1'
            }
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse attribute update rule', function() {
        // Clause
        let clause = "tar.job: :'President'";

        // Result
        let ruleObj = {
            tar: {
                type: 'tar',
                attr: 'job'
            },
            func: "'President'"
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse attribute update rule( no space )', function() {
        // Clause
        let clause = "tar.job::'President'";

        // Result
        let ruleObj = {
            tar: {
                type: 'tar',
                attr: 'job'
            },
            func: "'President'"
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse rule has ":" in string', function() {
        // Clause
        let clause = "B.b:A.a:$value + ':output'";

        // Result
        let ruleObj = {
            tar: {
                type: 'B',
                attr: 'b'
            },
            src: {
                type: 'A',
                attr: 'a'
            },
            func: "$value + ':output'"
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });   

    it('Parse rule has "\'" in string', function() {
        // Clause
        let clause = "B.b:A.a:$value + 'out\\':put'";

        // Result
        let ruleObj = {
            tar: {
                type: 'B',
                attr: 'b'
            },
            src: {
                type: 'A',
                attr: 'a'
            },
            func: "$value + 'out\\':put'"
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });   

});
