
/**
 * @param {number[]} nodeValues
 * @param {number[][]} edges
 * @param {number} maxNumberOfEdges
 * @return {number}
 */
var maxStarSum = function (nodeValues, edges, maxNumberOfEdges) {
    const totalNodes = nodeValues.length;
    
    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    this.graph_nodeID_to_nodeValues = Array.from(new Array(totalNodes), () => new Array());//Array<number>()
    for (let edge of edges) {
        addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1]);
        addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0]);
    }
    return calculateMaxStarSum(nodeValues, totalNodes, maxNumberOfEdges);
};

/**
 * @param {number[]} nodeValues
 * @param {number} fromNode
 * @param {number} toNode 
 * @return {void}
 */
function addEdgeEndingWithValueOfNode(nodeValues, fromNode, toNode) {
    if (nodeValues[toNode] > 0) {
        this.graph_nodeID_to_nodeValues[fromNode].push(nodeValues[toNode]);
    }
}

/**
 * @param {number[]} nodeValues
 * @param {number} totalNodes
 * @param {number} maxNumberOfEdges 
 * @return {number}
 */
function  calculateMaxStarSum(nodeValues, totalNodes, maxNumberOfEdges) {
    let maxStarSum = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < totalNodes; ++i) {
        let sum = nodeValues[i];
        this.graph_nodeID_to_nodeValues[i].sort((x, y) => y - x);

        for (let j = 0; j < maxNumberOfEdges && j < this.graph_nodeID_to_nodeValues[i].length; ++j) {
            sum += this.graph_nodeID_to_nodeValues[i][j];
        }
        maxStarSum = Math.max(maxStarSum, sum);
    }
    return maxStarSum;
}
