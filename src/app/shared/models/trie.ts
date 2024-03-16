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
      const char = word[i];
      const charNode = currentNode.children.get(char);
      if (charNode) {
        currentNode = charNode;
      } else {
        currentNode.children.set(char, new TrieNode(char));
        currentNode = currentNode.children.get(char)!;
      }
    }

    if (currentNode.word) {
      return new Error('Word already exists');
    }

    currentNode.word = word;
    return word;
  }

  autoComplete(input: string): string[] {
    let currentNode = this.root;
    for (let i = 1; i < input.length; i++) {
      const char = input[i];
      const charNode = currentNode.children.get(char);
      if (charNode) {
        currentNode = charNode;
      } else {
        return [];
      }
    }
    const words = getCompletedWords(currentNode);
    return words;
  }
}

function getCompletedWords(node: TrieNode, words: string[] = []): string[] {
  if (node.word) {
    words.push(node.word);
  }
  node.children.forEach((child) => getCompletedWords(child, words));
  return words;
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
