import * as _ from 'lodash';

// Private variables
// let _eventName = '_test';

// Convert method
export let xfer = function( src, /*rule*/ ) {
    let tar = [];
    _.forEach( src, function( obj, /*key*/ ) {
        var tarObj = {};
        tarObj.first = obj[0];
        tarObj.second = obj[1];
        tar.push(tarObj);
    } );
    return tar;
};
