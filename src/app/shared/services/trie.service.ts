import { Injectable, signal } from '@angular/core';
// import { TrieParent } from '../models/trie';
import { Trie } from '../models/trieObj';
import { DEFAULT_NAMES } from '../enums/names';

@Injectable({
  providedIn: 'root',
})
export class TrieService {
  // nameTrie = signal(new TrieParent());
  nameTrie = signal(new Trie());

  constructor() {
    if (localStorage.getItem('nameTrie')) {
      this.nameTrie.set(
        this.nameTrie().fromJSON(localStorage.getItem('nameTrie')!)
      );
    } else {
      for (const name of DEFAULT_NAMES) {
        this.nameTrie().addWord(name);
      }
      localStorage.setItem('nameTrie', this.nameTrie().toJSON());
    }
  }

  addWord(word: string) {
    this.nameTrie().addWord(word);
    localStorage.setItem('nameTrie', this.nameTrie().toJSON());
  }
}
