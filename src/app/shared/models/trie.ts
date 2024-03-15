export class TrieNode {
  children = new Map<string, TrieNode>();
  value: string;
  word: string | null;

  constructor(value: string, word?: string) {
    this.value = value;
    this.word = word ? word : null;
  }
}

export class Trie {
  root: TrieNode;

  constructor(value: string) {
    this.root = new TrieNode(value);
  }

  addWord(word: string): string | Error {
    let currentNode = this.root;

    for (let i = 1; i < word.length; i++) {
      if (currentNode.children.has(word[i])) {
        if (i === word.length - 1) {
          if (!currentNode.children.get(word[i])!.word) {
            currentNode.children.get(word[i])!.word = word;
          } else {
            return new Error('Word exists already');
          }
        } else {
          currentNode = currentNode.children.get(word[i])!;
        }
      } else {
        if (i === word.length - 1) {
          currentNode.children.set(word[i], new TrieNode(word[i], word));
        } else {
          currentNode.children.set(word[i], new TrieNode(word[i]));
          currentNode = currentNode.children.get(word[i])!;
        }
      }
    }
    return word;
  }

  autoComplete(input: string): string[] {
    let words: string[] = [];
    let currentNode = this.root;
    for (let i = 1; i < input.length; i++) {
      if (currentNode.children.has(input[i])) {
        currentNode = currentNode.children.get(input[i])!;
      } else {
        return [];
      }
    }
    let basket: TrieNode[] = [];
    currentNode.children.forEach((child) => basket.push(child));
    if (currentNode.word) {
      words.push(currentNode.word);
    }
    for (const node of basket) {
      if (node.word) {
        words.push(node.word);
      }
      node.children.forEach((child) => basket.push(child));
    }
    return words;
  }
}

export class TrieParent {
  children = new Map<string, Trie>();

  addWord(word: string) {
    word = word.toLowerCase();
    if (!this.children.has(word[0])) {
      this.children.set(word[0], new Trie(word[0]));
    }
    return this.children.get(word[0])!.addWord(word);
  }

  autoComplete(input: string) {
    if (!this.children.has(input[0])) {
      return [];
    }
    return this.children.get(input[0])!.autoComplete(input);
  }
}
