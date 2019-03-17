/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import { Const } from './Const.js';

export let isType = function( obj, typeName ) {
    if( typeName === Const.TYPE_ROOT ) {
        return true;
    }
    return obj[Const.KEY_TYPE] === typeName;
};

export let set = function( obj, path, value ) {
    // Only support single path for now
    if ( value && value[Const.KEY_TYPE] && !path.includes('.') ) {
        _.set( value, Const.KEY_REFBY + '.' + path, obj );
    }
    return _.set( obj, path, value );
};