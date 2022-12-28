
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Solution {

    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    List<Integer>[] graph_nodeID_to_nodeValues;

    public int maxStarSum(int[] nodeValues, int[][] edges, int maxNumberOfEdges) {

        final int totalNodes = nodeValues.length;
        graph_nodeID_to_nodeValues = new ArrayList[totalNodes];
        for (int i = 0; i < totalNodes; ++i) {
            graph_nodeID_to_nodeValues[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1]);
            addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0]);
        }

        return calculateMaxStarSum(nodeValues, totalNodes, maxNumberOfEdges);
    }

    private void addEdgeEndingWithValueOfNode(int[] nodeValues, int fromNode, int toNode) {
        if (nodeValues[toNode] > 0) {
            graph_nodeID_to_nodeValues[fromNode].add(nodeValues[toNode]);
        }
    }

    private int calculateMaxStarSum(int[] nodeValues, int totalNodes, int maxNumberOfEdges) {
        int maxStarSum = Integer.MIN_VALUE;
        for (int i = 0; i < totalNodes; ++i) {
            int sum = nodeValues[i];
            Collections.sort(graph_nodeID_to_nodeValues[i], Comparator.reverseOrder());
            for (int j = 0; j < maxNumberOfEdges && j < graph_nodeID_to_nodeValues[i].size(); ++j) {
                sum += graph_nodeID_to_nodeValues[i].get(j);
            }
            maxStarSum = Math.max(maxStarSum, sum);
        }
        return maxStarSum;
    }
}
