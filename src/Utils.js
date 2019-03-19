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

export let set = function( obj, key, value ) {

    let path = _.toPath(key);
    // Only support single path for now
    if ( path.length === 1 ) {
        if ( _.isArray(value) ) {
            _.forEach( value, function(v) {
                setRefby( obj, path[0], v );
            } );
        } else {
            setRefby( obj, path[0], value );
        }

        if ( !value ) {
            delete obj[path[0]];
            return obj;
        } else {
            return _.set( obj, path[0], value );
        }
    }

    var trvRes = trv([obj], path, 0, path.length - 1 );

    if ( trvRes.length > 0 ) {
        // One flattern for a.b[0].c case
        return _.forEach(_.flatten(trvRes), function(o){
            _.set( o, path[path.length - 1], value );
        });
    } else {
        _.set( obj, key, value );
    }
};

export let get = function( obj, value ) {
    let res = trv( [obj], _.toPath(value) );
    // For not breaking logic, now we have if else below
    if ( res.length === 0 ) {
        return undefined;
    } else if ( res.length === 1 ) {
        return res[0];
    } else {
        return res;
    }
};

let trv = function( objArr, path, startIndex, endIndex ) {
    let hasFlattened = false;
    let index = ( startIndex === undefined ) ? 0 : startIndex;
    const length = ( endIndex === undefined ) ? path.length : endIndex;

    while ( objArr.length > 0 && index < length ) {
        // support string template later
        let res = [];
        let isAllArray = true;
        _.forEach( objArr, function(o){
            let v = o[path[index]];
            if ( v ) {
                res.push(v);
            }
            if( isAllArray && !_.isArray(o) ) {
                isAllArray = false;
            }
        });

        if ( res.length === 0 && isAllArray && !hasFlattened ) {
            objArr = _.flatten( objArr );
            hasFlattened = true;
        } else {
            index++;
            objArr = res;
            hasFlattened = false;
        }
    }

    return objArr;
}; 