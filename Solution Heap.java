
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    //graph_nodeID_to_nodeValues[nodeID].size() <= maxNumberOfEdges
    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    PriorityQueue<Integer>[] graph_nodeID_to_nodeValues;

    public int maxStarSum(int[] nodeValues, int[][] edges, int maxNumberOfEdges) {

        final int totalNodes = nodeValues.length;
        graph_nodeID_to_nodeValues = new PriorityQueue[totalNodes];
        for (int i = 0; i < totalNodes; ++i) {
            graph_nodeID_to_nodeValues[i] = new PriorityQueue<>();
        }

        for (int[] edge : edges) {
            addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1], maxNumberOfEdges);
            addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0], maxNumberOfEdges);
        }

        return calculateMaxStarSum(nodeValues, totalNodes);
    }

    private void addEdgeEndingWithValueOfNode(int[] nodeValues, int fromNode, int toNode, int maxNumberOfEdges) {
        if (nodeValues[toNode] > 0 && graph_nodeID_to_nodeValues[fromNode].size() < maxNumberOfEdges) {
            graph_nodeID_to_nodeValues[fromNode].add(nodeValues[toNode]);
        } else if (!graph_nodeID_to_nodeValues[fromNode].isEmpty() && graph_nodeID_to_nodeValues[fromNode].peek() < nodeValues[toNode]) {
            graph_nodeID_to_nodeValues[fromNode].poll();
            graph_nodeID_to_nodeValues[fromNode].add(nodeValues[toNode]);
        }
    }

    private int calculateMaxStarSum(int[] nodeValues, int totalNodes) {
        int maxStarSum = Integer.MIN_VALUE;
        for (int i = 0; i < totalNodes; ++i) {
            int sum = nodeValues[i]
                    + Arrays.stream(graph_nodeID_to_nodeValues[i]
                            .toArray(new Integer[graph_nodeID_to_nodeValues[i].size()]))
                            .reduce((x, y) -> x + y).orElse(0);
            maxStarSum = Math.max(maxStarSum, sum);
        }
        return maxStarSum;
    }
}
