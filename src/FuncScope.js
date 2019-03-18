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
