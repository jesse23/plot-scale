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
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(tarObj) {
                    if( isType( tarObj, ruleObj.tar.type ) ) {
                        if ( ruleObj.cond ) {
                            let cond = new Function('_', '$value', '$object', '$graph', 'return ' + ruleObj.cond );
                            if ( ruleObj.src ) {
                                let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                                if ( !cond(_, tarObj._plot_source[arg], tarObj._plot_source, g) ) {
                                    return true;
                                }
                            } else {
                                let arg = ruleObj.tar ? ruleObj.tar.attr : undefined;
                                if ( !cond(_, tarObj[arg], tarObj, g) ) {
                                    return true;
                                }
                            }
                        }

                        if ( ruleObj.func ) {
                            let func = new Function('_', '$value', '$object', '$graph', 'return ' + ruleObj.func );
                            if ( ruleObj.src ) {
                                let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                                _.set( tarObj, ruleObj.tar.attr, 
                                    func(_, _.get(tarObj._plot_source, arg ), tarObj._plot_source, g ) );
                            } else {
                                let arg = ruleObj.tar ? ruleObj.tar.attr : undefined;
                                _.set( tarObj, ruleObj.tar.attr, func(_, _.get(tarObj,arg), tarObj, g ) );
                            }
                        } else {
                            _.set( tarObj, ruleObj.tar.attr, _.get(tarObj._plot_source, ruleObj.src.attr) );
                        }
                    }
                } );
            } );
            return g;
        };
    }
}

