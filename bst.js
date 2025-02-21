import { sortUnique } from "./sorting.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(sortUnique(array), 0 , sortUnique(array).length -1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        const midPoint = start + Math.floor((end - start) / 2);
        
        const root = new Node(array[midPoint]);
        
        root.left = this.buildTree(array, start, (midPoint -1));
        root.right = this.buildTree(array, (midPoint + 1), end);

        return root;
    }   
    
    insert(value) {
        const newNode = new Node(value);

        let currentNode = this.root;
        let lastNode = null;
        while (currentNode != null) {
            lastNode = currentNode;
            if (value < currentNode.data) currentNode = currentNode.left;
            else currentNode = currentNode.right;
        }
        if (value < lastNode.data) lastNode.left = newNode;
        else lastNode.right = newNode;
    }
}

const test = new Tree([1, 1, 687, 11, 22, 2, 44, 3453, 34, 3464363, 0]);
test.insert(33);





















const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  
prettyPrint(test.root);

