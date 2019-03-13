/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export class NodeMapper {
    constructor() {
        let _ruleObjs = [];

        let isType = function( /*obj, className*/ ) {
            return true;
        };

        this.when = function( ruleObj ) {
            return ruleObj.src && !ruleObj.src.attr && ruleObj.tar && !ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.run = function( g ) {
            var tG = [];
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(srcObj) {
                    if( isType( srcObj, ruleObj.src.type ) ) {
                        let tar = {};
                        tar._src = srcObj;
                        tar._type = ruleObj.tar.type;
                        tG.push(tar);
                    }
                } );
            } );
            return tG;
        };
    }
}

