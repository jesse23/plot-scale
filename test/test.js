/**
 * Test module
 */

// Module
import * as App from '../src/app.js';
import * as assert from 'assert';

// Suite
describe('Basic Mapping Requirement', function() {
  
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
            'tar:Object',
            'tar.first:Object.0',
            'tar.second:Object.1'
        ];

        assert.deepEqual( App.xfer( source, rules ), target );
    });

    it('Case2 by Rule', function() {
 
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

        // Rule
        let rules = [
            "tar:Object",
            "tar.first_name:Object.name:$value.split(' ')[0]",
            "tar.last_name:Object.name:$value.split(' ')[1]",
            "tar.birthday:Object.birthday:(new Date($value)).toISOString().split('T')[0]",
            "tar.address.street_address:Object.address:$value.split(', ')[0]",
            "tar.address.city:Object.address:$value.split(', ')[1]",
            "tar.address.state:Object.address:$value.split(', ')[2]",
            "tar.address.country:Object.address:$value.split(', ')[3]",
        ];

        assert.deepEqual( App.xfer( source, rules ), target );
    });
});
