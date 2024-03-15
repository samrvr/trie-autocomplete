import { Injectable, signal } from '@angular/core';
import { TrieParent } from '../models/trie';

@Injectable({
  providedIn: 'root',
})
export class TrieService {
  nameTrie = signal(new TrieParent());

  constructor() {
    this.nameTrie().addWord('Sam');
    this.nameTrie().addWord('Samuel');
    this.nameTrie().addWord('Sammy');
    this.nameTrie().addWord('Samantha');

    this.nameTrie().addWord('Mike');
    this.nameTrie().addWord('Mikey');
    this.nameTrie().addWord('Mick');
    this.nameTrie().addWord('Michael');
    this.nameTrie().addWord('Michelle');
    this.nameTrie().addWord('Micky');
  }
}
