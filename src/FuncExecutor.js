/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';


export let evalExpr = function( value, object, graph, expr ) {
    let func = new Function('_', '$value', '$object', '$graph', 'return ' + expr );
    return func( _, value, object, graph);
};

export let evalDef = function( funcRules ) {
    // TODO: Need to be enhanced
    if ( global ) {
        global.$p = {};
    } else{
        window.$p = {};
    }

    let func = new Function( funcRules.join('') );
    return func();
};