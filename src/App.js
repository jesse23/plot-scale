/**
 * @license
 * Copyright 2019 Wenjia Peng
 * Available under MIT License
 */
import * as _ from 'lodash';
import * as Compiler from './Compiler';
import * as FuncExecutor from './FuncExecutor';
import { Const } from './Const';

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
export let run = function ( sG, rules, funcRules ) {

    sG = _.cloneDeep( sG );

    FuncExecutor.evalDef( funcRules );

    // process input with _plot_type
    _.forEach( sG, function(obj){
        obj[Const.KEY_TYPE] = Const.TYPE_ROOT;
    });

    return _.reduce( Compiler.compile( rules ), function( g, proc ) {
        return proc.exec(g);
    }, sG);
};
