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

    delete(value) {
        const node = this.find(value);
        if (node == undefined) return false;

        //find parent node
        let parentNode = this.root;
        while (parentNode != null) {
            if (parentNode.left == node || parentNode.right == node) break;

            if (parentNode.data < node.data) {
                parentNode = parentNode.right;
            } else {
                parentNode = parentNode.left;
            }
        }

        //If node is a leaf node
        if (node.left == null && node.right == null) {
            if (node.data > parentNode.data) {
                parentNode.right = null;
            } else {
                parentNode.left = null;
            }
        }
        //If node has only one child
        else if (node.left == null || node.left == null) {
            //set parent pointer to nodes only child
            let childNode = node.left;
            if (childNode == null) childNode = node.right;

            if (node.data > parentNode.data) {
                parentNode.right = childNode;
            } else {
                parentNode.left = childNode;
            }
        }
        // if node has two children
        else {
            //replace node value with the next biggest value, aka in the right subtree, the leftmost node.
            //and then remove that node
            let nextBiggest = node.right;
            while (nextBiggest.left != null) {
                nextBiggest = nextBiggest.left;
            }
            this.delete(nextBiggest.data)
            node.data = nextBiggest.data;
        }
        return true;            

    }

    find(value, node = this.root) {
        if (node == null) return null;

        if (value == node.data) return node;
        else if (value > node.data) return this.find(value, node.right);
        else return this.find(value, node.left);
    }

    levelOrder(callback, queue = [this.root]) {
        if (queue.length == 0) return;

        let currentNode = queue.shift();
        if (currentNode.left != null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right != null) {
            queue.push(currentNode.right);
        }
        callback(currentNode);
        this.levelOrder(callback, queue);

    }
}

const test = new Tree([1, 1, 687, 11, 22, 2, 44, 3453, 34, 3464363, 0]);
test.insert(33);

function con(node) {
    console.log(node.data);
}

test.levelOrder(con);





















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

