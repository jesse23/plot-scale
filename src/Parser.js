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
let parseClause = function( ruleClause ) {
    return ruleClause.match(/\s*((('(\\'|[^'])*')|({[^}]*})|[^:])*)\s*(:|$)/g).map(str => str.replace(/:$/,'').trim());
};

let parseTrv = function( trvClause ) {
    return trvClause.split(/\.(.+)/).map( str => str.trim() );
};

let parseFunc = function( funcClause ) {
    return funcClause.replace(/^\s*{(.*)}\s*$/,'$1').trim();
};

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
    let [ tarClause, srcClause, funcClause, condClause ] = parseClause(ruleClause);

    // Parse tarClause
    let [ tarType, tarAttr ] = parseTrv( tarClause );

    // Parse srcClause
    let [ srcType, srcAttr ] = parseTrv( srcClause );

    // Parse funcClause
    let funcExpr = parseFunc( funcClause );

    return _.reduce([
        tarType,
        tarAttr,
        srcType,
        srcAttr,
        funcExpr,
        condClause
    ], function( obj, clause, key ) {
        return clause ? _.set( obj, ruleObjDef[key], clause) : obj;
    }, {} );
};


