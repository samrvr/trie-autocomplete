export class TrieNode {
  children: { [key: string]: TrieNode } = {};
  value: string;
  word: boolean;

  constructor(value: string, endOfWord: boolean = false) {
    this.value = value;
    this.word = endOfWord;
  }
}

export class Trie {
  root: TrieNode = new TrieNode('');

  addWord(word: string): string | Error {
    word = word.toLowerCase();

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const charNode = currentNode.children[char];
      if (charNode) {
        currentNode = charNode;
      } else {
        currentNode.children[char] = new TrieNode(char);
        currentNode = currentNode.children[char];
      }
    }

    if (currentNode.word) {
      return new Error('Word already exists');
    }

    currentNode.word = true;
    return word;
  }

  autoComplete(input: string): string[] {
    let currentNode = this.root;
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const charNode = currentNode.children[char];
      if (charNode) {
        currentNode = charNode;
      } else {
        return [];
      }
    }
    const words = getCompletedWords(currentNode, input);
    console.log(words);
    return words;
  }

  getNodesAtLevel(level: number): TrieNode[] {
    let nodes = [this.root];
    for (let i = 0; i < level; i++) {
      let temp: TrieNode[] = [];
      for (let j = 0; j < nodes.length; j++) {
        temp = temp.concat(Object.values(nodes[j].children));
      }
      nodes = temp;
    }
    return nodes;
  }

  get maxNodeWidth() {
    let maxWidth = 0;
    let nodes = [this.root];
    while (nodes.length) {
      let temp: TrieNode[] = [];
      for (let j = 0; j < nodes.length; j++) {
        temp = temp.concat(Object.values(nodes[j].children));
      }
      nodes = temp;
      maxWidth = Math.max(maxWidth, nodes.length);
    }
    return maxWidth;
  }

  get depth() {
    let depth = 0;
    let nodes = [this.root];
    while (nodes.length) {
      let temp: TrieNode[] = [];
      for (let j = 0; j < nodes.length; j++) {
        temp = temp.concat(Object.values(nodes[j].children));
      }
      nodes = temp;
      depth++;
    }
    return depth;
  }

  toJSON() {
    return JSON.stringify(this.root);
  }

  fromJSON(json: string) {
    this.root = JSON.parse(json);
    return this;
  }
}

function getCompletedWords(
  node: TrieNode,
  curInput: string,
  words: string[] = []
): string[] {
  if (node.word) {
    words.push(curInput);
  }
  for (const char in node.children) {
    getCompletedWords(node.children[char], curInput + char, words);
  }
  return words;
}
