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

        assert.deepEqual( Utils.query( input, clause ).result, output );
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

        assert.deepEqual( Utils.query( input, clause ).result, output );
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
        let output = {
            result: [
                "Peters"
            ],
            isSingle: true 
        };

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    it('Verify query returns isSingle as false when returns an array', function() {
        // rule
        let clause = 'name.first';

        // input
        let input = [
            {
                name: {
                    first: [ "Peters" ]
                }
            }
        ];

        // output
        let output = {
            result: [
                "Peters"
            ],
            isSingle:  false
        };

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

        assert.deepEqual( Utils.query( input, clause ).result, output );
    });

    it('Verify query returns values as flat array for multiple traverse with multi-value', function() {
        // rule
        let clause = 'name.last';

        // input
        let input = [
            {
                name: {
                    last: "Peters"
                }
            },
            {
                name: {
                    last: "Ray"
                }
            }
        ];

        // output
        let output = {
            result: [
                "Peters",
                "Ray"
            ],
            isSingle: false
        };

        assert.deepEqual( Utils.query( input, clause ), output );
    });


    it('Verify query returns values as flat array for multiple traverse with multi-value and last traverse gets array', function() {
        // rule
        let clause = 'name.alias';

        // input
        let input = [
            {
                name: {
                    alias: [ 
                        "Peters",
                        "Ghost"
                    ]
                }
            },
            {
                name: {
                    alias: [
                        "Ray",
                        "Phantom"
                    ]
                }
            }
        ];

        // output
        let output = [
            "Peters",
            "Ghost",
            "Ray",
            "Phantom"
        ];

        assert.deepEqual( Utils.query( input, clause ).result, output );
    });


    it('Verify query returns correct value for the case with type identifier', function() {
        // rule
        let clause = 'children/Boy.name';

        // input
        let input = [
            {
                name: "Tom",
                children: {
                    _plot_type: "Boy",
                    name: "Mike"
                }
            },
            {
                name: "Lee",
                children: {
                    _plot_type: "Girl",
                    name: "Mia"
                }
            }
        ];

        // output
        let output = {
            result: [
                "Mike"
            ],
            isSingle: true
        };

        assert.deepEqual( Utils.query( input, clause ), output );
    });

    xit('Verify query returns correct value for the case with attribute filter', function() {
        // rule
        let clause = "children/{ $value.name === 'Mike'}.name";

        // input
        let input = [
            {
                name: "Tom",
                children: {
                    _plot_type: "Boy",
                    name: "Mike"
                }
            },
            {
                name: "Lee",
                children: {
                    _plot_type: "Girl",
                    name: "Mia"
                }
            }
        ];

        // output
        let output = {
            result: [
                "Mike"
            ],
            isSingle: true
        };

        assert.deepEqual( Utils.query( input, clause ), output );
    });
});
