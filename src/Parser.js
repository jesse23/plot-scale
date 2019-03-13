/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

// ----------------------------------------------------------------------
// Example: 
// tar.last_name:Object.name:$value.split(' ')[1]
//
// Output:
// ruleObj = {
//     tar: {
//         type: tar,
//         attr: last_name
//     }
//     src: {
//         type: Object
//         attr: name
//     },
//     func: $value.split(' ')[1]
// }
// ----------------------------------------------------------------------

export let parse = function( ruleClause ) {
    // ruleObj definition
    var ruleObjDef = [
        'tar.type',
        'tar.attr',
        'src.type',
        'src.attr',
        'func',
        'cond'
    ];

    // Parse clause
    let [ tarClause, srcClause, funcClause, condClause ] = ruleClause.split(':');

    // Parse srcClause
    let [ srcType, srcAttr ] = srcClause.split('.');

    // Parse tarClause
    let [ tarType, tarAttr ] = tarClause.split(/\.(.+)/);

    return _.reduce([
        tarType,
        tarAttr,
        srcType.trim(),
        srcAttr,
        funcClause,
        condClause
    ], function( obj, clause, key ) {
        return clause ? _.set( obj, ruleObjDef[key], clause) : obj;
    }, {} );
};


