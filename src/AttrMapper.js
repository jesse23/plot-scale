/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Utils from './Utils';

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

                        if ( ruleObj.cond && !Utils.evalExpr( obj[objClause.attr], obj, g, ruleObj.cond ) ) {
                            return true;
                        }

                        if ( ruleObj.func ) {
                            _.set( tarObj, ruleObj.tar.attr, Utils.evalExpr( obj[objClause.attr], obj, g, ruleObj.func ) );
                        } else {
                            _.set( tarObj, ruleObj.tar.attr, _.get(obj, objClause.attr) );
                        }
                    }
                } );
            } );
            return g;
        };
    }
}

