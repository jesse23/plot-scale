/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 * 
 * Utilities
 */

import * as _ from 'lodash';

export let isType = function( obj, typeName ) {
    if( typeName === 'Object' ) {
        return true;
    }
    return obj._plot_type === typeName;
};

export let evalExpr = function( value, object, graph, expr ) {
    let func = new Function('_', '$value', '$object', '$graph', 'return ' + expr );
    return func( _, value, object, graph);
};