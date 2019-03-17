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