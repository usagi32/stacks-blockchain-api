/* eslint-disable camelcase */
/** @param { import("node-pg-migrate").MigrationBuilder } pgm */

exports.up = pgm => {
  pgm.addColumn('mempool_txs', {
    replacing_txid: {
      type: 'string', 
      notNull: false,
    }
  });
};


