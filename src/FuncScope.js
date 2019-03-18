/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */

import * as _ from 'lodash';
import { Const } from './Const';

export let queryGraph = function( g, cond, type ) {
    if ( type ) {
        cond[Const.KEY_TYPE] = type;
    }
    return _.filter( g, cond );
};

export let mapId = function( value, idAttr ) {
    if ( _.isArray(value) ) {
        if ( value.length === 0 ) {
            return undefined;
        } else {
            let res = _.map( value, idAttr );
            return ( value.length === 1 ) ? res[0] : res;
        }
    } else if ( value ){
        return _.get( value, idAttr );
    }
};

export let getMappedObject = function( value ) {
    var res = _.flatMap(value, Const.KEY_REFBY + '.' + Const.KEY_SOURCE);
    return res.length > 0 ? res : value;
};
