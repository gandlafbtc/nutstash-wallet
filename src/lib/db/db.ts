import { openDB, deleteDB, type IDBPDatabase } from 'idb';
import type { NutstashDB } from './model';

export const DB_VERSION = 1;
export const DB_NAME = 'nutstash-db';

export class DB {
  private static _db: IDBPDatabase<NutstashDB> | undefined = undefined

  static getInstance = async () => {
    if (this._db) {
      return this._db;
    }
    const database = await this.openDatabase()
    this._db = database
    return this._db
  }

  static async openDatabase() {
    const db = await openDB<NutstashDB>(DB_NAME, DB_VERSION, {
      upgrade:
        (db, oldVersion, newVersion, transaction, event) => {
          db.createObjectStore('encrypted-mints')
          db.createObjectStore('encrypted-settings')
          db.createObjectStore('encrypted-mint-quotes')
          db.createObjectStore('encrypted-melt-quotes')
          db.createObjectStore('encrypted-transactions')
          db.createObjectStore('encrypted-contacts')
          db.createObjectStore('encrypted-messages')
          db.createObjectStore('encrypted-counts')
          db.createObjectStore('encrypted-proofs')
          db.createObjectStore('encrypted-spent-proofs')
          db.createObjectStore('encrypted-pending-proofs')
          db.createObjectStore('encrypted-offline-proofs')
          db.createObjectStore('encrypted-keys')
          db.createObjectStore('encrypted-nwc-keys')
          db.createObjectStore('encrypted-mnemonics')
          db.createObjectStore('encrypted-relays')
      },
      blocked: (currentVersion, blockedVersion, event) => {
        // …
      },
      blocking: (currentVersion, blockedVersion, event) => {
        // …
      },
      terminated: () => {
        // …
      },
    });
    return db
  }

  static async deleteDatabase () {
     await deleteDB(DB_NAME)
  }

  static async close() {
    throw new Error("Not implemented");
    
  }

}
