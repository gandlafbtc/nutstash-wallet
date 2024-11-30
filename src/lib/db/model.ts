import { type DBSchema } from 'idb';
import type { Contact, EncryptedStore, KeysetCount, Message, Mint, Proof, Settings, StoredMintQuote } from './models/types';

export interface NutstashDB extends DBSchema {
  'encrypted-settings': {
    key: string;
    value: EncryptedStore;
  };
  'encrypted-mint-quotes': {
    key: string;
    value: EncryptedStore;
  };
  'encrypted-melt-quotes': {
    key: string;
    value: EncryptedStore;
  };
  'encrypted-transactions': {
    key: string;
    value: EncryptedStore;
  };
  'encrypted-contacts': {
    key: string;
    value: EncryptedStore
  }
  'encrypted-counts': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-proofs': {
    key: string;
    value: EncryptedStore
  }
  'encrypted-spent-proofs': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-pending-proofs': {
    key: string;
    value: EncryptedStore;
  }
   'encrypted-offline-proofs': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-keys': {
    key: string;
    value: EncryptedStore;
  },
  'encrypted-nwc-keys': {
    key: string;
    value: EncryptedStore;
  },
  'encrypted-messages': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-mnemonics': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-mints': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-relays': {
    key: string;
    value: EncryptedStore;
  }
  'encrypted-cashu-requests': {
    key: string;
    value: EncryptedStore;
  }

}