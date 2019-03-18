/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Utils from './Utils';
import { Const } from './Const';

export class NodeMapper {
    constructor() {
        let _ruleObjs = [];

        this.when = function( ruleObj ) {
            return ruleObj.src && !ruleObj.src.attr && ruleObj.tar && !ruleObj.tar.attr; 
        };

        this.add = function( ruleObj ) {
            _ruleObjs.push(ruleObj);
        };

        this.exec = function( g ) {
            var tG = [];
            _.forEach( _ruleObjs, function( ruleObj ) {
                _.forEach( g, function(srcObj) {
                    if( Utils.isType( srcObj, ruleObj.src.type ) ) {
                        let tar = {};
                        tar[Const.KEY_TYPE] = ruleObj.tar.type;
                        tG.push(Utils.set( tar, Const.KEY_SOURCE, srcObj ));
                    }
                } );
            } );
            return tG;
        };
    }
}

