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
    let [ tarClause, srcClause, funcClause, condClause ] = ruleClause.match(/(('[^']*')|[^:])*(:|$)/g);

    // Parse srcClause
    let [ srcType, srcAttr ] = srcClause.replace(/:$/,'').split('.');

    // Parse tarClause
    let [ tarType, tarAttr ] = tarClause.replace(/:$/,'').split(/\.(.+)/);

    return _.reduce([
        tarType,
        tarAttr,
        srcType.trim(),
        srcAttr,
        funcClause ? funcClause.replace(/:$/,'') : funcClause,
        condClause ? condClause.replace(/:$/,'') : condClause
    ], function( obj, clause, key ) {
        return clause ? _.set( obj, ruleObjDef[key], clause) : obj;
    }, {} );
};


