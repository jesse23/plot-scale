/**
 * Test module
 */

// Module
import * as App from '../src/app.js';
import * as assert from 'assert';

// Suite
describe('Basic Mapping Requirement', function() {
  
    it('First Mapping Case', function() {
 
        // Source
        let source = [ [ 'a', 'b' ], [ 'c', 'd' ] ];

        // Target
        let target = [ {
            first:  'a',
            second: 'b'
        },
        {
            first:  'c',
            second: 'd'
        } ];

        assert.deepEqual(App.xfer(source), target);
    });
});
