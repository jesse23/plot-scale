/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Utils from './Utils';
export class GraphProcessor {
    constructor() {
        let _ruleObjs = [];

        this.when = function( ruleObj ) {
            return ruleObj.src && !ruleObj.tar && ruleObj.func; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(obj) {
                    if( Utils.isType( obj, ruleObj.src.type ) ) {
                        if ( ruleObj.cond && !Utils.evalExpr( obj[ruleObj.src.attr], obj, g, ruleObj.cond ) ) {
                            return true;
                        }

                        _.set( obj, ruleObj.src.attr, Utils.evalExpr( obj[ruleObj.src.attr], obj, g, ruleObj.func ) );
                    }
                } );
            } );
            return g;
        };
    }
}
