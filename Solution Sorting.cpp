
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

class Solution {
    
    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    vector<vector<int>> graph_nodeID_to_nodeValues;
    
public:
    int maxStarSum(const vector<int>& nodeValues, const vector<vector<int>>& edges, int maxNumberOfEdges) {
        const size_t totalNodes = nodeValues.size();
        graph_nodeID_to_nodeValues.resize(totalNodes);

        for (const auto& edge : edges) {
            addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1], maxNumberOfEdges);
            addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0], maxNumberOfEdges);
        }

        return calculateMaxStarSum(nodeValues, totalNodes, maxNumberOfEdges);
    }

private:
    void addEdgeEndingWithValueOfNode(const vector<int>& nodeValues, int fromNode, int toNode, int maxNumberOfEdges) {
        if (nodeValues[toNode] > 0) {
            graph_nodeID_to_nodeValues[fromNode].push_back(nodeValues[toNode]);
        }
    }

    int calculateMaxStarSum(const vector<int>& nodeValues, size_t totalNodes, int maxNumberOfEdges) {
        int maxStarSum = INT_MIN;
        for (int i = 0; i < totalNodes; ++i) {
            int sum = nodeValues[i];
            sort(graph_nodeID_to_nodeValues[i].begin(), graph_nodeID_to_nodeValues[i].end(), greater<>());
            for (size_t j = 0; j < graph_nodeID_to_nodeValues[i].size() && j < maxNumberOfEdges; ++j) {
                sum += graph_nodeID_to_nodeValues[i][j];
            }
            maxStarSum = max(maxStarSum, sum);
        }
        return maxStarSum;
    }
};
