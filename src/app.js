import * as _ from 'lodash';

// Private variables
// let _eventName = '_test';

export let xfer = function ( srcObjs, processor ) {
    return _.map( srcObjs, processor );
};

// Convert method
export let processor1 = function( obj ) {
    return { 
        first:  obj[0],
        second: obj[1]
    };
};

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
