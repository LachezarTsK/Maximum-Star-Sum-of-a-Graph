
//const {PriorityQueue} = require('@datastructures-js/priority-queue');

/**
 * @param {number[]} nodeValues
 * @param {number[][]} edges
 * @param {number} maxNumberOfEdges
 * @return {number}
 */
var maxStarSum = function (nodeValues, edges, maxNumberOfEdges) {
    const totalNodes = nodeValues.length;
    
    //graph_nodeID_to_nodeValues[nodeID].length <= maxNumberOfEdges
    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    this.graph_nodeID_to_nodeValues = Array.from(new Array(totalNodes), () => new MinPriorityQueue());//new MinPriorityQueue<number>()

    for (let edge of edges) {
        addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1], maxNumberOfEdges);
        addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0], maxNumberOfEdges);
    }
    return calculateMaxStarSum(nodeValues, totalNodes);
};

/**
 * @param {number[]} nodeValues
 * @param {number} fromNode
 * @param {number} toNode 
 * @param {number} maxNumberOfEdges
 * @return {void}
 */
function addEdgeEndingWithValueOfNode(nodeValues, fromNode, toNode, maxNumberOfEdges) {
    if (nodeValues[toNode] > 0 && this.graph_nodeID_to_nodeValues[fromNode].size() < maxNumberOfEdges) {
        this.graph_nodeID_to_nodeValues[fromNode].enqueue(nodeValues[toNode]);
    } else if (!this.graph_nodeID_to_nodeValues[fromNode].isEmpty() && this.graph_nodeID_to_nodeValues[fromNode].front().element < nodeValues[toNode]) {
        this.graph_nodeID_to_nodeValues[fromNode].dequeue();
        this.graph_nodeID_to_nodeValues[fromNode].enqueue(nodeValues[toNode]);
    }
}

/**
 * @param {number[]} nodeValues
 * @param {number} totalNodes
 * @return {number}
 */
function  calculateMaxStarSum(nodeValues, totalNodes) {
    let maxStarSum = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < totalNodes; ++i) {
        let sum = nodeValues[i];
        const arrayFromPriorityQueue = this.graph_nodeID_to_nodeValues[i].toArray();
        arrayFromPriorityQueue.forEach(value => sum += value.element);
        maxStarSum = Math.max(maxStarSum, sum);
    }
    return maxStarSum;
}
