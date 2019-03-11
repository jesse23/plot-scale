/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */
import * as _ from 'lodash';
import * as Parser from './parser.js';

// Private variables
// let _eventName = '_test';

// Example1: 
// obj: obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: [ obj.0, obj.1 ]
// obj.first:  @obj[0]
// obj.second: @obj[1]
// { obj.first: 0, obj.second: 1 }: @obj <-- not straight forward
// { first, second }: { @obj.0, @obj.1 }
//
// Example2:
// obj: @obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: @obj.name <-- split
// obj.birthday: @obj.birthday <-- convert
// obj.address: @obj.address   <-- convert
// [ addr.street_address, addr.city, addr.state, addr.country ] = @obj.address <-- split


// ----------------------------------------------------------------------
// xfer version
// ----------------------------------------------------------------------
// Return true for now
function isType( /*obj, className*/ ) {
    return true;
}

export let xfer = function ( sG, rules ) {
    var tG = [];

    _.forEach( rules, function( rule ) {
        // Parse rule
        let ruleObj = Parser.parse( rule );

        // Class mapping
        if ( !ruleObj.src.attr && !ruleObj.tar.attr ) {
            _.forEach( sG, function(srcObj) {
                if( isType( srcObj, ruleObj.src.type ) ) {
                    let tar = {};
                    tar._src   = srcObj;
                    tar._type = ruleObj.tar.type;
                    tG.push(tar);
                }
            } );
        }

        // Attribute mapping
        if ( ruleObj.src.attr && ruleObj.tar.attr ) {
            _.forEach( tG, function(tarObj) {
                if ( ruleObj.func ) {
                    var func = new Function('$value', 'return ' + ruleObj.func );
                    _.set( tarObj, ruleObj.tar.attr, func(tarObj._src[ruleObj.src.attr]) );
                } else {
                    _.set( tarObj, ruleObj.tar.attr, tarObj._src[ruleObj.src.attr] );
                }
            } );
        }
    } );

    // Clean up internal attribute
    _.forEach( tG, function(tarObj) {
        delete tarObj._src;
        delete tarObj._type;
    } );

    return tG;
};
