'use strict';

import crypto from 'crypto';

export default {
  /**
   * get random id
   * @return {[type]} [description]
   */
  randomID: () => {
    return crypto.createHash('sha1').update(crypto.randomBytes(20)).digest();
  },
  /**
   * decode nodes data
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  decodeNodes(data){
    let nodes = [];
    for (let i = 0; i + 26 <= data.length; i += 26) {
      nodes.push({
        nid: data.slice(i, i + 20),
        address: `${data[i + 20]}.${data[i + 21]}.${data[i + 22]}.${data[i + 23]}`,
        port: data.readUInt16BE(i + 24)
      });
    }
    return nodes;
  },
  /**
   * get neighbor id
   * @param  {[type]} target [description]
   * @param  {[type]} nid    [description]
   * @return {[type]}        [description]
   */
  genNeighborID(target, nid){
    return Buffer.concat([target.slice(0, 10), nid.slice(10)]);
  }
};