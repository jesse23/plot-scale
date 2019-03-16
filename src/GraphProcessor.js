/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class GraphProcessor {
    constructor() {
        let _ruleObjs = [];

        let isType = function( obj, typeName ) {
            if( typeName === 'Object' ) {
                return true;
            }
            return obj._plot_type === typeName;
        };

        this.when = function( ruleObj ) {
            return ruleObj.src && !ruleObj.tar; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(obj) {
                    if( isType( obj, ruleObj.src.type ) ) {
                        if ( ruleObj.cond ) {
                            let cond = new Function('_', '$value', '$object', '$graph', 'return ' + ruleObj.cond );
                            let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                            if ( !cond(_, obj[arg], obj, g) ) {
                                return true;
                            }
                        }

                        if ( ruleObj.func ) {
                            let func = new Function('_', '$value', '$object', '$graph', 'return ' + ruleObj.func );
                            let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                            _.set( obj, ruleObj.src.attr, func(_, obj[arg], obj, g) );
                            console.log( 'Jesse:' + JSON.stringify(obj));
                        } else {
                            // _.set( obj, ruleObj.src.attr, obj[ruleObj.src.attr] );
                        }
                    }
                } );
            } );
            return g;
        };
    }
}

