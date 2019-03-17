/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';

export let isType = function( obj, typeName ) {
    if( typeName === 'Object' ) {
        return true;
    }
    return obj._plot_type === typeName;
};

export let set = function( obj, path, value ) {
    // Only support single path for now
    _.set( obj, path, value );
    if ( value && value._plot_type && !path.includes('.') ) {
        _.set( value, '_plot_refby.' + path, obj );
    }
};