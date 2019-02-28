/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

// import * as _ from 'lodash';

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
    // Parse rule
    let [ tarClause, srcClause, funcClause, condClause ] = ruleClause.split(':');
    let [ srcClass, srcAttr ] = srcClause.split('.');

    // Target Rule
    let [ tarClass, tarAttr ] = tarClause.split(/\.(.+)/);

    return {
        tar: {
            type: tarClass,
            attr: tarAttr
        },
        src: {
            type: srcClass,
            attr: srcAttr
        },
        func: funcClause,
        cond: condClause
    };
};


