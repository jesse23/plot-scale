/**
 * Test module
 */

// Module
import * as App from '../src/app.js';
import * as assert from 'assert';

// Suite
describe('Basic Mapping Requirement', function() {
  
    it('Case1', function() {
 
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

        assert.deepEqual( App.xfer0( source, App.processor1 ), target);
    });

    it('Case2', function() {
 
        // Source
        let source = [ {
            name: 'George Washington',
            birthday: 'February 22, 1732',
            address: '3200 Mount Vernon Memorial Highway, Mount Vernon, Virginia, United States'
        } ];

        // Target
        let target = [ {
            first_name: 'George',
            last_name: 'Washington',
            birthday: '1732-02-22',
            address: {
                street_address: '3200 Mount Vernon Memorial Highway',
                city: 'Mount Vernon',
                state: 'Virginia',
                country: 'United States'
            }
        } ];

        assert.deepEqual( App.xfer0( source, App.processor2 ), target );
    });

    it('Case1 by Rule', function() {
 
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

        // Rule
        let rules = [
            'tar:obj',
            'tar.first:obj.0',
            'tar.second:obj.1'
        ];

        assert.deepEqual( App.xfer( source, rules ), target );
    });


});
