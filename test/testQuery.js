/**
 * Test module
 */

// Module
import * as _ from 'lodash';
import * as assert from 'assert';
import * as Utils from '../src/Utils';

// Suite
describe('Test Query', function() {

    it('Verify basic string query', function() {
        // rule
        let clause = 'name';

        // input
        let input = [
            {
                name: "Lucy"
            }
        ];

        // output
        let output = [
            "Lucy"
        ];

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    it('Verify query returns [] when result is not found', function() {
        // rule
        let clause = 'name';

        // input
        let input = [
            {
                desc: "description"
            }
        ];

        // output
        let output = [
        ];

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    it('Verify query returns correct value for multiple traverse', function() {
        // rule
        let clause = 'name.first';

        // input
        let input = [
            {
                name: {
                    first: "Peters"
                }
            }
        ];

        // output
        let output = [
            "Peters"
        ];

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    it('Verify query returns values as array for multiple results', function() {
        // rule
        let clause = 'name';

        // input
        let input = [
            {
                name: "Lucy"
            },
            {
                name: "Jim"
            }
        ];

        // output
        let output = [
            "Lucy",
            "Jim"
        ];

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    it('Verify query returns values as flat array for multiple traverse with multi-value', function() {
        // rule
        let clause = 'name.first';

        // input
        let input = [
            {
                name: {
                    first: "Peters"
                }
            }
        ];

        // output
        let output = [
            "Peters"
        ];

        assert.deepEqual( Utils.query( input, clause ), output );
    });

});
