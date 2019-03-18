/**
 * Test module
 */

// Module
import * as App from '../src/App';
import * as assert from 'assert';

// Suite
describe('Test Attribute Mapping', function() {
    it('Verify { cond ? a : b } works correctly in function', function() {
        // Rule
        let rules = [
            "tar:Object",
            "tar.name:Object.name",
            "tar.type:Object.age:{ $value > 17 ? 'Adult' : 'Child' }"
        ];
 
        // Source
        let source = [ {
            name: 'Bill',
            age: 20

        }, {
            name: 'Tom',
            age: 17
        } ];

        // Target
        let target = [ {
            name: 'Bill',
            type: 'Adult'
        },{
            name: 'Tom',
            type: 'Child'
        } ];

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Verify attribute mapping with condition rule', function() {
        // Rule
        let rules = [
            "tar:Object",
            "tar.name:Object.name",
            "tar.type:Object.age:'Adult' : $value > 17",
            "tar.type:Object.age: 'Child' : $value < 18"
        ];
 
        // Source
        let source = [ {
            name: 'Bill',
            age: 20

        }, {
            name: 'Tom',
            age: 17
        } ];

        // Target
        let target = [ {
            name: 'Bill',
            type: 'Adult'
        },{
            name: 'Tom',
            type: 'Child'
        } ];

        assert.deepEqual( App.run( source, rules ), target );
    });

});
