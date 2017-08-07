import { Pipe, PipeTransform } from '@angular/core';


/**
 * 
 * 
 * @export
 * @class EllipsisPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'bcEllipsis' })
export class EllipsisPipe implements PipeTransform {
  /**
   * 
   * 
   * @param {string} str 
   * @param {number} [strLength=250] 
   * @returns 
   * @memberof EllipsisPipe
   */
  transform(str: string, strLength: number = 250) {
    const withoutHtml = str.replace(/(<([^>]+)>)/ig, '');

    if (str.length >= strLength) {
      return `${withoutHtml.slice(0, strLength)}...`;
    }

    return withoutHtml;
  }
}
