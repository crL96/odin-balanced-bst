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
        this.root = this.buildTree(sortUnique(array), 0 , array.length -1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        const midPoint = start + Math.floor((end - start) / 2);
        
        const root = new Node(array[midPoint]);
        
        root.left = this.buildTree(array, start, (midPoint -1));
        root.right = this.buildTree(array, (midPoint + 1), end);

        return root;

    }     
}

const test = new Tree([1, 687, 11, 22, 2, 2, 3453, 34, 11, 3464363, 0]);





















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

