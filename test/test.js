/**
 * Test module
 */

// Module
import * as App from '../src/App.js';
import * as assert from 'assert';

// Suite
describe('Test as Example', function() {
  
    it('Test: Map Json to Array', function() {
        // Rule
        let rules = [
            'tar:Object',
            'tar.first:Object.0',
            'tar.second:Object.1'
        ];
 
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

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Test: Map string attribute to object', function() {
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

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Test: Map constant string as function', function() {
        // Rule
        let rules = [
            "tar:Object",
            "tar.job: :'President'"
        ];
 
        // Source
        let source = [ {
            name: 'George Washington'
        }, {
            name: 'Donald Trump'
        } ];

        // Target
        let target = [ {
            job: 'President'
        },{
            job: 'President'
        } ];

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Test: Map for different type', function() {
        // Mapping Rule
        let rules = [
            // pre-processing
            ":Object._plot_type:$object.type",

            // mapping rule
            "UI:View",
            "Geometry:Shape",
            "Object.type::$object._plot_type",
            "UI.viewLength:View.length",
            "Geometry.shapeLength:Shape.length",
        ];
 
        // Source
        let source = [
            {
                type: "View",
                length: 35,
            },
            {
                type: "View",
                length: 45,
            },
            {
                type: "Shape",
                length: "30",
            },
            {
                type: "Shape",
                length: "40",
            }
        ];

        // Target
        let target = [
            {
                type: "UI",
                viewLength: 35
            },
            {
                type: "UI",
                viewLength: 45
            },
            {
                type: "Geometry",
                shapeLength: 30,
            },
            {
                type: "Geometry",
                shapeLength: 40
            }
        ];
        assert.deepEqual( App.run( source, rules ), target );
    });

    it( 'Test: Merge objects', function() {
        // Rule
        let rules = [
            // pre-processing
            ":Object._plot_type:$object.type",
            ":View.source:_.filter($graph, { '_plot_type': 'Source', 'id': $value })",

            // Mapping
            "Part:View",
            "Object.type::$object._plot_type",
            "Part.width:View.width",
            "Part.length:View.source[0].length",
        ];

        // Source
        let source = [
            {
                type: "View",
                width: 35,
                source: "0003",
                from: "0002",
                id: "0001"
            },
            {
                type: "View",
                width: 45,
                source: "0004",
                id: "0002"
            },
            {
                type: "Source",
                length: "30",
                displayValue: "shape1",
                id: "0003"
            },
            {
                type: "Source",
                length: "40",
                displayValue: "shape2",
                id: "0004"
            }
        ];

        // Target
        let target = [
            {
                type: "Part",
                length: "30",
                width: 35,
            },
            {
                type: "Part",
                length: "40",
                width: 45,
            }
        ];

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Test: Map object reference', function() {
        // Rule
        let rules = [
            // pre-processing
            ":Object._plot_type:$object.type",
            ":View.source:_.filter($graph, { '_plot_type': 'Source', 'id': $value })",

            "Part:View",
            "Part.name:View.source[0].displayValue:'N'.concat($value)",
            "Part.coreRef:View.source:_.map($value, '_plot_refby._plot_source')",
            // TODO: Need to enhance later
            "Part.coreRef[0].width:View.width",

            "Core:Source",
            "Core.length:Source.length:parseInt($value)",

            "Object.uid:Object.id:$value.replace(/^00/,'M')",

            // Post processing
            "Object.type::$object._plot_type",
            "Part.coreRef::_.map($value, 'uid')[0]",
        ];
 
        // Source
        let source = [
            {
                type: "View",
                width: 35,
                source: "0003",
                from: "0002",
                id: "0001"
            },
            {
                type: "View",
                width: 45,
                source: "0004",
                id: "0002"
            },
            {
                type: "Source",
                length: "30",
                displayValue: "shape1",
                id: "0003"
            },
            {
                type: "Source",
                length: "40",
                displayValue: "shape2",
                id: "0004"
            }
        ];

        // Target
        let target = [
            {
                type: "Part",
                name: "Nshape1",
                coreRef: "M03",
                uid: "M01"
            },
            {
                type: "Part",
                name: "Nshape2",
                // nextGen: "M01",
                coreRef: "M04",
                uid: "M02"
            },
            {
                type: "Core",
                width: 35,
                length: 30,
                uid: "M03"
            },
            {
                type: "Core",
                width: 45,
                length: 40,
                uid: "M04"
            }
        ];

        assert.deepEqual( App.run( source, rules ), target );
    });

    it('Test: Custom function in mapping', function() {
        // Function rule
        let funcRules = [
            "$p.$accu = function() {",
            "    var id = 0;",
            "    return function() {",
            "        id++;",
            "        return id;",
            "    };",
            "}();"
        ];

        // Rule
        let rules = [
            "Object:Object",
            "Object.name:Object.name",
            "Object.id::$p.$accu()"
        ];
 
        // Source
        let source = [ 
            {
                name: 'George Washington'
            }, 
            {
                name: 'Donald Trump'
            } 
        ];

        // Target
        let target = [ 
            {
                name: 'George Washington',
                id: 1
            }, 
            {
                name: 'Donald Trump',
                id: 2
            } 
        ];

        assert.deepEqual( App.run( source, rules, funcRules ), target );
    });
});
