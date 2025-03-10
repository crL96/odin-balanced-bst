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
        if (this.find(value) != null) return;

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
        if (typeof callback != "function") throw Error ("No valid callback function");
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

    inOrder(callback, node = this.root) {
        if (typeof callback != "function") throw Error ("No valid callback function");

        if (node.left != null) {
            this.inOrder(callback, node.left);
        }
        callback(node);
        if (node.right != null) {
            this.inOrder(callback, node.right);
        }
    }

    preOrder(callback, node = this.root) {
        if (typeof callback != "function") throw Error ("No valid callback function");

        callback(node);
        if (node.left != null) {
            this.preOrder(callback, node.left);
        }
        if (node.right != null) {
            this.preOrder(callback, node.right);
        }
    }

    postOrder(callback, node = this.root) {
        if (typeof callback != "function") throw Error ("No valid callback function");

        if (node.left != null) {
            this.postOrder(callback, node.left);
        }
        if (node.right != null) {
            this.postOrder(callback, node.right);
        }
        callback(node);
    }

    height(node, currentHeight = 0) {
        // if (node == null) return;
        if (node.left != null || node.right != null) {
            currentHeight++;
        } else return currentHeight;

        let left = 0;
        if (node.left != null) {
            left = this.height(node.left, currentHeight);
        }
        let right = 0;
        if (node.right != null) {
            right = this.height(node.right, currentHeight);
        }

        if (left > right) return left;
        else return right;
    }

    depth(node, currentNode = this.root, depth = 0) {
        if (currentNode == null) return null;

        if (node == currentNode) return depth;
        else if (node.data > currentNode.data) {
            return this.depth(node, currentNode.right, depth + 1);
        }
        else return this.depth(node, currentNode.left, depth + 1);
    }

    isBalanced(node = this.root) {
        //is balanced if height difference between left and right subtree is 1 or less.
        if (node == null) return true;

        let leftHeight = 0;
        if (node.left != null) leftHeight = this.height(node.left);
        let rightHeight = 0;
        if (node.right != null) rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        if (!(this.isBalanced(node.left)) || !(this.isBalanced(node.right))) {
            return false;
        }
        return true;
    }

    rebalance() {
        const array = [];
        this.inOrder((element) => {
            array.push(element.data);
        });
        this.root = this.buildTree(array, 0 , array.length -1);
    }
}

export { Tree };