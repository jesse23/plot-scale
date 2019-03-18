/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as Parser from './Parser';
import {NodeMapper} from './NodeMapper';
import {AttrMapper} from './AttrMapper';
import {JsonFormatter} from './JsonFormatter';
import { GraphProcessor } from './GraphProcessor';

export let compile = function( ruleClauses ) {

    let procs = [];

    procs.push(new GraphProcessor());
    procs.push(new NodeMapper());
    procs.push(new AttrMapper());
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


