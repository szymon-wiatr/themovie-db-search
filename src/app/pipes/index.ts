import { NgModule } from '@angular/core';

import { EllipsisPipe } from './ellipsis';


export const PIPES = [
  EllipsisPipe
];

/**
 * 
 * 
 * @export
 * @class PipesModule
 */
@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
