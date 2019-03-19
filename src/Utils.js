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

let setRefby = function( obj, path, value ) {
    if ( value && value[Const.KEY_TYPE] ) {
        _.set( value, Const.KEY_REFBY + '.' + path, [ obj ] );
    }
};

export let set = function( obj, path, value ) {
    // Only support single path for now
    if ( !path.includes('.') ) {
        if ( _.isArray(value) ) {
            _.forEach( value, function(v) {
                setRefby( obj, path, v );
            } );
        } else {
            setRefby( obj, path, value );
        }

        if ( !value ) {
            delete obj[path];
            return obj;
        } else {
            return _.set( obj, path, value );
        }
    }
    return _.set( obj, path, value );
};

export let get = function( obj, path ) {
    return _.get(obj, path);
};