/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class GraphProcessor {
    constructor() {
        let _ruleObjs = [];

        let isType = function( /*obj, typeName*/ ) {
            return true;
        };

        this.when = function( ruleObj ) {
            return ruleObj.src && !ruleObj.tar; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            return _.forEach( g, function(obj) {
                _.forEach( _ruleObjs, function( ruleObj ) {
                    if( isType( obj, ruleObj.src.type ) ) {
                        if ( ruleObj.cond ) {
                            let cond = new Function('$value', 'return ' + ruleObj.cond );
                            let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                            if ( !cond(obj[arg]) ) {
                                return true;
                            }
                        }

                        if ( ruleObj.func ) {
                            let func = new Function('$value', '$object', 'return ' + ruleObj.func );
                            let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                            _.set( obj, ruleObj.src.attr, func(obj[arg], obj) );
                        } else {
                            // _.set( obj, ruleObj.src.attr, obj[ruleObj.src.attr] );
                        }
                    }
                } );
            } );
        };
    }
}

