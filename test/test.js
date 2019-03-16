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

    xit('Test: Map object reference', function() {
        // Rule
        let rules = [
            "Part:View",
            "Core:Source",
            "Part.name:View.source->Source.displayValue:'N'.concat($value)",
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
                coreRef: "N03",
                uid: "N01"
            },
            {
                type: "Part",
                name: "Nshape2",
                nextGen: "N01",
                coreRef: "N04",
                uid: "N02"
            },
            {
                type: "Core",
                width: 35,
                length: 30,
                uid: "N03"
            },
            {
                type: "Core",
                width: 45,
                length: 40,
                uid: "N04"
            }
        ];

        assert.deepEqual( App.run( source, rules ), target );
    });
});
