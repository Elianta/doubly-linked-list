const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  append(data) {
    const node = new Node(data);
    if (this.length) {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    } else {
      this._head = node;
      this._tail = node;
    }
    this.length += 1;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    let currentNode = this._head;
    let currentNodeIndex = 0;
    while (currentNodeIndex < index) {
      currentNode = currentNode.next;
      currentNodeIndex += 1;
    }
    return currentNode.data;
  }

  insertAt(index, data) {
    const node = new Node(data);
    let currentNode = this._head;
    let currentNodeIndex = 0;
    while (currentNodeIndex < index) {
      currentNode = currentNode.next;
      currentNodeIndex += 1;
    }
    // If LList is empty
    if (currentNode === null) {
      this._head = node;
      this._tail = node;
    } else if (currentNode === this._head) {
      currentNode.prev = node;
      this._head = node;
      node.next = currentNode;
    } else {
      currentNode.prev.next = node;
      node.prev = currentNode.prev;
      currentNode.prev = node;
      node.next = currentNode;
    }

    this.length += 1;
    return this;
  }

  isEmpty() {
    return !this.length;
  }

  clear() {
    this.length = 0;
    this._head.data = null;
    this._tail.data = null;

    return this;
  }

  deleteAt(index) {
    let currentNode = this._head;
    let currentNodeIndex = 0;
    while (currentNodeIndex < index) {
      currentNode = currentNode.next;
      currentNodeIndex += 1;
    }

    if (currentNode === this._head && currentNode !== this._tail) {
      this._head = currentNode.next;
      currentNode.next.prev = currentNode.prev;
      currentNode.next = null;
      currentNode.prev = null;
    } else if (currentNode === this._tail && currentNode !== this._head) {
      this._tail = currentNode.prev;
      currentNode.prev.next = currentNode.next;
      currentNode.next = null;
      currentNode.prev = null;
    } else if (currentNode === this._head && currentNode === this._tail) {
      this._head.data = null;
      this._tail.data = null;
    } else {
      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
      currentNode.next = null;
      currentNode.prev = null;
    }

    this.length -= 1;

    return this;
  }

  reverse() {
    let currentNode = this._tail;
    this._head = this._tail;
    while (!(currentNode.prev === null)) {
      let next = currentNode.next;
      currentNode.next = currentNode.prev;
      currentNode.prev = next;
      currentNode = currentNode.next;
    }
    this._tail = currentNode;
    return this;
  }

  indexOf(data) {
    let currentNode = this._head;
    let currentNodeIndex = 0;
    while (currentNode !== null && currentNode.data !== data) {
      currentNode = currentNode.next;
      currentNodeIndex += 1;
    }

    return (currentNode === null) ? -1 : currentNodeIndex;
  }
}

module.exports = LinkedList;
