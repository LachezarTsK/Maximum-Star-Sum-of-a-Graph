
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

class Solution {
    
    //graph_nodeID_to_nodeValues[nodeID].length <= maxNumberOfEdges
    //graph_nodeID_to_nodeValues[nodeID] contains only neighbours with positive values
    vector<priority_queue<int, vector<int>, greater<>>> graph_nodeID_to_nodeValues;
    
public:
    int maxStarSum(const vector<int>& nodeValues, const vector<vector<int>>&edges, int maxNumberOfEdges) {
        const size_t totalNodes = nodeValues.size();
        graph_nodeID_to_nodeValues.resize(totalNodes);

        for (const auto& edge : edges) {
            addEdgeEndingWithValueOfNode(nodeValues, edge[0], edge[1], maxNumberOfEdges);
            addEdgeEndingWithValueOfNode(nodeValues, edge[1], edge[0], maxNumberOfEdges);
        }

        return calculateMaxStarSum(nodeValues, totalNodes);
    }

private:
    void addEdgeEndingWithValueOfNode(const vector<int>& nodeValues, int fromNode, int toNode, int maxNumberOfEdges) {
        if (nodeValues[toNode] > 0 && graph_nodeID_to_nodeValues[fromNode].size() < maxNumberOfEdges) {
            graph_nodeID_to_nodeValues[fromNode].push(nodeValues[toNode]);
        } else if (!graph_nodeID_to_nodeValues[fromNode].empty() && graph_nodeID_to_nodeValues[fromNode].top() < nodeValues[toNode]) {
            graph_nodeID_to_nodeValues[fromNode].pop();
            graph_nodeID_to_nodeValues[fromNode].push(nodeValues[toNode]);
        }
    }

    int calculateMaxStarSum(const vector<int>& nodeValues, int totalNodes) {
        int maxStarSum = INT_MIN;
        for (int i = 0; i < totalNodes; ++i) {
            int sum = nodeValues[i];

            while (!graph_nodeID_to_nodeValues[i].empty()) {
                sum += graph_nodeID_to_nodeValues[i].top();
                graph_nodeID_to_nodeValues[i].pop();
            }
            maxStarSum = max(maxStarSum, sum);
        }
        return maxStarSum;
    }
};
