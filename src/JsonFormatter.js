/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import { Const } from './Const.js';

export class JsonFormatter {
    constructor() {
        this.when = function( /*ruleObj*/ ) {
            return false; 
        };

        this.add = function( /*ruleObj*/ ) {
            // do nothing
        };

        this.exec = function( g ) {
            // Clean up internal attribute
            _.forEach( g, function(tarObj) {
                delete tarObj[Const.KEY_SOURCE];
                delete tarObj[Const.KEY_TYPE];
                delete tarObj[Const.KEY_REFBY];
            } );

            return g;
        };
    }
}

