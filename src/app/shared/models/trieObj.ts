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
