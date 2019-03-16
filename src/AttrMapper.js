/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class AttrMapper {
    constructor() {
        let _ruleObjs = [];

        let isType = function( obj, typeName ) {
            if( typeName === 'Object' ) {
                return true;
            }
            return obj._plot_type === typeName;
            //return true;
        };

        this.when = function( ruleObj ) {
            return ruleObj.tar && ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            return _.forEach( g, function(tarObj) {
                _.forEach( _ruleObjs, function( ruleObj ) {
                    if( isType( tarObj, ruleObj.tar.type ) ) {
                        if ( ruleObj.cond ) {
                            let cond = new Function('$value', '$object', 'return ' + ruleObj.cond );
                            if ( ruleObj.src ) {
                                let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                                if ( !cond(tarObj._plot_source[arg], tarObj._plot_source) ) {
                                    return true;
                                }
                            } else {
                                let arg = ruleObj.tar ? ruleObj.tar.attr : undefined;
                                if ( !cond(tarObj[arg], tarObj) ) {
                                    return true;
                                }
                            }
                        }

                        if ( ruleObj.func ) {
                            let func = new Function('$value', '$object', 'return ' + ruleObj.func );
                            if ( ruleObj.src ) {
                                let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                                _.set( tarObj, ruleObj.tar.attr, func(tarObj._plot_source[arg], tarObj._plot_source ) );
                            } else {
                                let arg = ruleObj.tar ? ruleObj.tar.attr : undefined;
                                _.set( tarObj, ruleObj.tar.attr, func(tarObj[arg], tarObj ) );
                            }
                        } else {
                            _.set( tarObj, ruleObj.tar.attr, tarObj._plot_source[ruleObj.src.attr] );
                        }
                    }
                } );
            } );
        };
    }
}

