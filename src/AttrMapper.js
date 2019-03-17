/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Utils from './Utils';
import * as FuncExecutor from './FuncExecutor';

export class AttrMapper {
    constructor() {
        let _ruleObjs = [];

        this.when = function( ruleObj ) {
            return ruleObj.tar && ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(tarObj) {
                    if( Utils.isType( tarObj, ruleObj.tar.type ) ) {
                        let objClause = ruleObj.src ? ruleObj.src : ruleObj.tar;
                        let obj = ruleObj.src ? tarObj._plot_source : tarObj;
                        let value = _.get(obj, objClause.attr);

                        if ( ruleObj.cond && !FuncExecutor.evalExpr( value, obj, g, ruleObj.cond ) ) {
                            return true;
                        }

                        if ( ruleObj.func ) {
                            Utils.set( tarObj, ruleObj.tar.attr, FuncExecutor.evalExpr( value, obj, g, ruleObj.func ) );
                        } else {
                            Utils.set( tarObj, ruleObj.tar.attr, value );
                        }
                    }
                } );
            } );
            return g;
        };
    }
}

