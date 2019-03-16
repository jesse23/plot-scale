/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

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
                delete tarObj._plot_source;
                delete tarObj._plot_type;
            } );

            return g;
        };
    }
}

