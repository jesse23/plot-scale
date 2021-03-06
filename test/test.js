/**
 * Test module
 */

// Module
import * as App from '../src/App';
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

    it( 'Test: Merge array', function() {
        // Rule
        let rules = [

            // Mapping
            "Object:Object",
            "Object.new_attr:Object.ref1.attr:_.map($value, function(v){return v.concat('_n')}).join(', ')"
        ];

        // Source
        let source = [
            {
                ref1: [
                    {
                        attr: 'a',
                    },
                    {
                        attr: 'b'
                    }
                ],
            }
        ];

        // Target
        let target = [
            {
                new_attr: "a_n, b_n"     
            }
        ];

        assert.deepEqual( App.run( source, rules ), target );
    } );

    xit( 'Test: Map array', function(){
        // Rule
        let rules = [
            "Object:Object",
            "Object.value:Object.value"
        ];

        // Source
        let source = [
            {
                value: [
                    1
                ]
            },
            {
                value: [
                    3
                ]
            }
        ];
        assert.deepEqual( App.run( source, rules ), source );
    } );


    it( 'Test: Merge objects', function() {
        // Rule
        let rules = [
            // pre-processing
            ":Object._plot_type:$object.type",
            ":View.source:$p.queryGraph($graph, { 'id': $value }, 'Source' )",

            // Mapping
            "Part:View",
            "Object.type::$object._plot_type",
            "Part.width:View.width",
            "Part.length:View.source.length",
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
            ":View.source:$p.queryGraph( $graph, { 'id': $value }, 'Source' )",
            ":View.from:$p.queryGraph( $graph, { 'id': $value }, 'View' )",

            "Part:View",
            "Part.name:View.source.displayValue:'N'.concat($value)",
            "Part.coreRef:View.source",

            "Part.coreRef.width:View.width",
            "Part.nextGen:View._plot_refby.from",

            "Core:Source",
            // "Core.length:Source.length:parseInt($value)",
            "Core.length:Source.length:",

            "Object.uid:Object.id:$value.replace(/^00/,'M')",

            // Post processing
            "Object.type::$object._plot_type",
            "Part.coreRef::$p.mapId($value, 'uid')",
            "Part.nextGen::$p.mapId($value, 'uid')"
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
                nextGen: "M01",
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

    it('Test: Merge object when no attr on target object', function(){
        // Rule
        let rules = [
            'tar:Object',
            'tar:Object.props:_.set( {}, $object.uid, _.join( [$value.name.value, $value.desc.value]) ) '
        ];
 
        // Source
        let source = [ 
            {
                type: "Element",
                uid: "00001",
                props: {
                    name: {
                        value: 'elem1',
                        isEditable: false 
                    },
                    desc: {
                        value: 'First Element',
                        isEditable: true
                    }
                }

            },
            {
                type: "Element",
                uid: "00002",
                props: {
                    name: {
                        value: 'elem2',
                        isEditable: false 
                    },
                    desc: {
                        value: 'Second Element',
                        isEditable: true
                    }
                }
            }
        ];

        // Target
        let target = [
            {
                "00001": "elem1,First Element"
            },
            {
                "00002": "elem2,Second Element"
            }
        ];

        assert.deepEqual( App.run( source, rules ), target );
    });
});
