/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Parser from './Parser.js';
import {PlotCreator} from './PlotCreator.js';
import {LeafCreator} from './LeafCreator.js';
import {JsonFormatter} from './JsonFormatter.js';

export let compile = function( ruleClauses ) {

    let procs = [];

    procs.push(new PlotCreator());
    procs.push(new LeafCreator());
    procs.push(new JsonFormatter());

    // Parse rule
    _.forEach( ruleClauses, function( rule ) {
        // Parse rule
        let ruleObj = Parser.parse( rule );

        _.forEach( procs, function( proc ) {
            if ( proc.when( ruleObj ) ) {
                proc.add( ruleObj );
            }
        });
    } );

    return procs;
};


