import { Tree } from "./bst.js";

function randomNumbers(n) {
    const array = []
    for (let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

function logNodeData(node) {
    console.log(node.data);
}

const tree = new Tree(randomNumbers(20));

console.log(tree.isBalanced());

console.log("Log inOrder")
tree.inOrder(logNodeData);

console.log("Log preOrder")
tree.preOrder(logNodeData);

console.log("Log postOrder")
tree.postOrder(logNodeData);

tree.insert(111);
tree.insert(200);
tree.insert(300);
tree.insert(400);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());


console.log("Log inOrder")
tree.inOrder(logNodeData);

console.log("Log preOrder")
tree.preOrder(logNodeData);

console.log("Log postOrder")
tree.postOrder(logNodeData);





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

  
prettyPrint(tree.root);