/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class AttrMapper {
    constructor() {
        let _ruleObjs = [];

        this.when = function( ruleObj ) {
            return ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            return _.forEach( g, function(tarObj) {
                _.forEach( _ruleObjs, function( ruleObj ) {
                    if ( ruleObj.cond ) {
                        let cond = new Function('$value', 'return ' + ruleObj.cond );
                        let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                        if ( !cond(tarObj._src[arg]) ) {
                            return true;
                        }
                    }

                    if ( ruleObj.func ) {
                        let func = new Function('$value', 'return ' + ruleObj.func );
                        let arg = ruleObj.src ? ruleObj.src.attr : undefined;
                        _.set( tarObj, ruleObj.tar.attr, func(tarObj._src[arg]) );
                    } else {
                        _.set( tarObj, ruleObj.tar.attr, tarObj._src[ruleObj.src.attr] );
                    }
                } );
            } );
        };
    }
}

