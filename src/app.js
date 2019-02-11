import * as _ from 'lodash';

// Private variables
// let _eventName = '_test';

// ----------------------------------------------------------------------
// xfer0 version
// ----------------------------------------------------------------------
export let xfer0 = function ( srcObjs, processor ) {
    return _.map( srcObjs, processor );
};

// obj: obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: [ obj.0, obj.1 ]
// obj.first:  @obj[0]
// obj.second: @obj[1]
// { obj.first: 0, obj.second: 1 }: @obj <-- not straight forward
// { first, second }: { @obj.0, @obj.1 }
//
// Convert method
export let processor1 = function( obj ) {
    return { 
        first:  obj[0],
        second: obj[1]
    };
};

// obj: @obj <-- it is needed when we need to write condition
// [ obj.first, obj.second ]: @obj.name <-- split
// obj.birthday: @obj.birthday <-- convert
// obj.address: @obj.address   <-- convert
// [ addr.street_address, addr.city, addr.state, addr.country ] = @obj.address <-- split
export let processor2 = function( obj ) {
    let tar = {};

    [ tar.first_name, tar.last_name ] = obj.name.split(' ');
    let date1 = new Date( obj.birthday );
    tar.birthday = [ 
        date1.getFullYear(), 
        ( date1.getMonth() < 9 ) ? '0'.concat(date1.getMonth() + 1) : date1.getMonth() + 1, 
        date1.getDate() 
    ].join('-');

    tar.address = {};
    var addr = tar.address;
    [ addr.street_address, addr.city, addr.state, addr.country ] = obj.address.split(', ');
    return tar;
};

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
        let [ tarClause, srcClause ] = rule.split(':');
        let [ srcClass, srcAttr ] = srcClause.split('.');
        let [ tarClass, tarAttr ] = tarClause.split('.');

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
                tarObj[tarAttr] = tarObj._src[srcAttr];
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
