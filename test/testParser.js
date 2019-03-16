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

    it('Parse rule has ":" in function clause', function() {
        // Clause
        let clause = "B.b:A.a:{ $value > 0 ? 'yes' : 'no' }";

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
            func: "$value > 0 ? 'yes' : 'no'"
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse json structure in function rule', function() {
        // Clause
        let clause = ":View.source:_.filter($graph, { '_plot_type': 'Source', 'id': $value })[0]";

        // Result
        let ruleObj = {
            src: {
                type: 'View',
                attr: 'source'
            },
            func: "_.filter($graph, { '_plot_type': 'Source', 'id': $value })[0]"
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
 
    });

    it('Parse rule has space in function clause', function() {
        // Clause
        let clause = "  B.b  :  A.a  :  { $value > 0 ? 'yes' : 'no' }  ";

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
            func: "$value > 0 ? 'yes' : 'no'"
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse rule has condition clause', function() {
        // Clause
        let clause = "B.b:A.a: 'yes' : $value > 0";

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
            func: "'yes'",
            cond: "$value > 0",
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse rule has ":" in condition clause', function() {
        // Clause
        let clause = "B.b:A.a::{ $value > 0 ? 'yes' : 'no' }";

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
            cond: "$value > 0 ? 'yes' : 'no'"
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

    it('Parse rule has space in condition clause', function() {
        // Clause
        let clause = "  B.b  :  A.a  :  :  { $value > 0 ? 'yes' : 'no' }  ";

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
            cond: "$value > 0 ? 'yes' : 'no'"
        };
        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });

});
