/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import { Const } from './Const';

export let isType = function( obj, typeName ) {
    if( typeName === Const.TYPE_ROOT ) {
        return true;
    }
    return obj[Const.KEY_TYPE] === typeName;
};

export let set = function( obj, path, value ) {


    // Only support single path for now
    if ( !path.includes('.') ) {
        if ( _.isArray(value) ) {
            _.forEach( value, function(v) {
                if ( v && v[Const.KEY_TYPE] ) {
                    _.set( v, Const.KEY_REFBY + '.' + path, obj );

                }
            } );
        } else if ( value && value[Const.KEY_TYPE] ) {
            _.set( value, Const.KEY_REFBY + '.' + path, obj );
        }
    }
    return _.set( obj, path, value );
};