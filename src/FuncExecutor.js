/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

let _scope = {};

export let evalExpr = function( value, object, graph, expr ) {
    let func = new Function('_', '$value', '$object', '$graph', '$p', 'return ' + expr );
    return func( _, value, object, graph, _scope );
};

export let evalDef = function( funcRules ) {
    _scope = {};

    let func = new Function( '$p', funcRules.join('') );
    return func( _scope );
};