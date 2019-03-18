/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import * as FuncScope from './FuncScope';

let _scope = {};

export let evalExpr = function( value, object, graph, expr ) {
    let func = new Function('_', '$value', '$object', '$graph', '$p', 'return ' + expr );
    return func( _, value, object, graph, _scope );
};

export let evalDef = function( funcRules ) {
    _scope = _.clone(FuncScope);

    if ( funcRules && funcRules.length > 0 ) {
        let func = new Function( '$p', funcRules.join('') );
        func( _scope );
    }
    return _scope;
};