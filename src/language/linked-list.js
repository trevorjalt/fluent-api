class _Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor () {
        this.head = null
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }

    insertBefore(item, key) {
        if (this.head === null) {
            return
        }

        if (this.head.value === key) {
            this.insertFirst(item)
            return
        }

        let previousNode = null
        let currNode = this.head

        while (currNode !== null && currNode.value !== key) {
            previousNode = currNode
            currNode = currNode.next
        }

        if (currNode === null) {
            console.log('Node not found to insert')
            return
        }

        previousNode.next = new _Node(item, currNode)
    }

    insertAfter(item, key) {
        if (this.head === null) {
            return
        }

        let previousNode = null
        let currNode = this.head

        while (currNode !== null && currNode.value !== key) {
            previousNode = currNode
            currNode = currNode.next
        }

        if (currNode === null) {
            console.log('Node not found to insert')
            return
        }

        currNode.next = new _Node(item, currNode.next)
    }

    insertAt(i, item) {
        if (this.head === null) {
            console.log('List is empty')
            return
        }

        if (i === 0) {
            this.insertFirst(item)
            return
        }

        const currNode = this._findnthElement(i - 1)

        if (!currNode) {
            console.log('Index out of bounds')
            return
        }

        const newNode = new _Node(item, null)
        newNode.next = currNode.next
        currNode.next = newNode
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head
            while (tempNode.next !== null) {
                tempNode = tempNode.next
            }
            tempNode.next = new _Node(item, null)
        }
    }

    find(item) {
        let currNode = this.head
        if (!this.head) {
            return null
        }
        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null
            }
            else {
                currNode = currNode.next
            }
        }

        return currNode
    }

    _findnthElement(pos) {
        let node = this.head

        try {
        for ( let i = 0; i < pos; i++) {
            node = node.next
        }
        } catch(e) {
            return null
        }
        return node
    }

    remove(item) {
        if (!this.head) {
            return null
        }
        if (this.head.value === item) {
            this.head = this.head.next
            return
        }
        let currNode = this.head
        let previousNode = this.head

        while (( currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode
            currNode = currNode.next
        }
        if (currNode === null) {
            console.log('Item not found')
            return
        }
        previousNode.next = currNode.next
    }

    find(item) {
        if (!this.head) {
          return null;
        }
        let currNode = this.head;
        while (currNode.value !== item) {
          if (currNode.next === null) {
            return null;
          } else {
            currNode = currNode.next;
          }
        }
        return currNode;
    }

    moveListHead(value) {
        let head = this.head;
        this.head = this.head.next;
        this.insertAt(value, head.value)
    }

    length() {
        let node = this.head;
        const arr = [];
        while(node) {
            arr.push(node);
            node = node.next;
        }
        return arr.length;
    }

    listNodes() {
        let node = this.head;
        const arr = [];
        while(node) {
          arr.push(node);
          node = node.next;
        }
        return arr;
      }
}

module.exports = { LinkedList }