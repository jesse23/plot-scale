import * as _ from 'lodash';

// Private variables
// let _eventName = '_test';

// Example1: 
// obj: obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: [ obj.0, obj.1 ]
// obj.first:  @obj[0]
// obj.second: @obj[1]
// { obj.first: 0, obj.second: 1 }: @obj <-- not straight forward
// { first, second }: { @obj.0, @obj.1 }
//
// Example2:
// obj: @obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: @obj.name <-- split
// obj.birthday: @obj.birthday <-- convert
// obj.address: @obj.address   <-- convert
// [ addr.street_address, addr.city, addr.state, addr.country ] = @obj.address <-- split


// ----------------------------------------------------------------------
// xfer version
// ----------------------------------------------------------------------
// Return true for now
function isClass( /*obj, className*/ ) {
    return true;
}

export let xfer = function ( srcObjs, rules ) {
    var tG = [];

    _.forEach( rules, function( rule ) {
        // Parse rule
        let [ tarClause, srcClause, funcClause ] = rule.split(':');
        let [ srcClass, srcAttr ] = srcClause.split('.');

        // Target Rule
        let [ tarClass, tarAttr ] = tarClause.split(/\.(.+)/);

        // Class mapping
        if ( !srcAttr && !tarAttr ) {
            _.forEach( srcObjs, function(srcObj) {
                if( isClass( srcObj, srcClass ) ) {
                    let tar = {};
                    tar._src   = srcObj;
                    tar._class = tarClass;
                    tG.push(tar);
                }
            } );
        }

        // Attribute mapping
        if ( srcAttr && tarAttr ) {
            _.forEach( tG, function(tarObj) {
                if ( funcClause ) {
                    var func = new Function('$value', 'return ' + funcClause );
                    _.set( tarObj, tarAttr, func(tarObj._src[srcAttr]) );
                } else {
                    _.set( tarObj, tarAttr, tarObj._src[srcAttr] );
                }
            } );
        }
    } );

    // Clean up internal attribute
    _.forEach( tG, function(tarObj) {
        delete tarObj._src;
        delete tarObj._class;
    } );

    return tG;
};
