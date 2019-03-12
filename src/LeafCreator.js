/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class LeafCreator {
    constructor() {
        let _ruleObjs = [];

        this.when = function( ruleObj ) {
            return ruleObj.src.attr && ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.run = function( g ) {
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(tarObj) {
                    if ( ruleObj.func ) {
                        var func = new Function('$value', 'return ' + ruleObj.func );
                        _.set( tarObj, ruleObj.tar.attr, func(tarObj._src[ruleObj.src.attr]) );
                    } else {
                        _.set( tarObj, ruleObj.tar.attr, tarObj._src[ruleObj.src.attr] );
                    }
                } );
            } );
            return g;
        };
    }
}

