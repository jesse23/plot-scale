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

    var trvRes = trv([obj], path, 0, path.length - 1 ).result;

    if ( trvRes.length > 0 ) {
        // One flattern for a.b[0].c case
        return _.forEach(_.flatten(trvRes), function(o){
            if ( path.length > 0 ) {
                _.set( o, path[path.length - 1], value );
            } else {
                _.assign( o, value );
            }
        });
    } else {
        if (key) {
            _.set( obj, key, value );
        } /*else {
            _.assign( obj, value );
        }*/
    }
};

export let get = function( obj, key ) {
    return getPolyfill(query( [obj], key ).result);
};

export let getPolyfill = function( res ) {
    // For not breaking logic, now we have if else below
    if ( res.length === 0 ) {
        return undefined;
    } else if ( res.length === 1 ) {
        return res[0];
    } else {
        return res;
    }
};

export let query = function( objArr, key ) {
    return trv( objArr, _.toPath(key) );
};

let getValue = function( obj, key ){
    let [ attr, filterKey ] = key.split('/');
    let value = obj[attr];
    let isSingle = !_.isArray(value);
    let value1 = value ? ( isSingle ? [ value ] : value ) : [];
    return {
        result: _.filter(value1,function(v){
            return filterKey ? v._plot_type === filterKey : true;
        }),
        isSingle: isSingle
    };
};

let trv = function( objArr, paths, startIndex, endIndex ) {
    let index = ( startIndex === undefined ) ? 0 : startIndex;
    const length = ( endIndex === undefined ) ? paths.length : endIndex;

    let isSingle = true;
    while ( objArr.length > 0 && index < length ) {
        // path process logic
        let path = paths[index];

        // support string template later
        let res = [];
        isSingle = true;
        objArr.forEach( function(o){
            isSingle = objArr.length === 1;
            let v = getValue( o, path );
            isSingle = isSingle && v.isSingle;
            res = res.concat(v.result);
        });

        index++;
        objArr = res;
    }

    return {
        result: objArr,
        isSingle: isSingle
    };
}; 

// https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json
export let toString = function(value){
    if( _.isFunction(value) ) {
        return '<#function#' + value.name + '>';
    } else {
        let cache = [];
        return JSON.stringify(value, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        return JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        // discard key if value cannot be deduped
                        return '<#ref>';
                    }
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
    }
};
