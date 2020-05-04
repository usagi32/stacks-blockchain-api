import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('stx_events', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    event_index: {
      type: 'integer',
      notNull: true,
    },
    tx_id: {
      notNull: true,
      type: 'bytea',
    },
    block_height: {
      type: 'integer',
      notNull: true,
    },
    block_hash: {
      type: 'bytea',
      notNull: true,
    },
    canonical: {
      type: 'boolean',
      notNull: true,
    },
    asset_event_type_id: {
      type: 'smallint',
      notNull: true,
    },
    amount: {
      type: 'bigint',
      notNull: true,
    },
    sender: 'string',
    recipient: 'string',
  });

  pgm.createIndex('stx_events', 'tx_id');
  pgm.createIndex('stx_events', 'block_height');
  pgm.createIndex('stx_events', 'block_hash');
  pgm.createIndex('stx_events', 'canonical');
  pgm.createIndex('stx_events', 'sender');
  pgm.createIndex('stx_events', 'recipient');

  pgm.addConstraint('stx_events', 'valid_asset_transfer', `CHECK (asset_event_type_id != 1 OR (
    NOT (sender, recipient) IS NULL
  ))`);

  pgm.addConstraint('stx_events', 'valid_asset_mint', `CHECK (asset_event_type_id != 2 OR (
    sender IS NULL AND recipient IS NOT NULL
  ))`);

  pgm.addConstraint('stx_events', 'valid_asset_burn', `CHECK (asset_event_type_id != 3 OR (
    recipient IS NULL AND sender IS NOT NULL
  ))`);

}