/**
 * Test module
 */

// Module
import * as Parser from '../src/Parser.js';
import * as assert from 'assert';

// Suite
describe('Test Parser', function() {

    it('Parse type mapping rule', function() {
 
        // Source
        let clause = "B:A";

        // Target
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
 
        // Source
        let clause = "tar.second:Object.1";

        // Target
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
 
        // Source
        let clause = "tar.job: :'President'";

        // Target
        let ruleObj = {
            tar: {
                type: 'tar',
                attr: 'job'
            },
            func: "'President'"
        };

        assert.deepEqual( Parser.parse( clause ), ruleObj );
    });
});
