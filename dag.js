/*
DAG
TODOs
-- remove node
*/

function DagNode(name) {
    var name = name;
    var children = {};

    this.isDescendant = function(node) {
	var descendants = this.getDescendants([]);
	for (var descendant in descendants) {
	    if (descendants[descendant] === node.getName()) {
		return true;
	    }
	}
	return false;
    };

    this.getChildren = function() {
	return Object.keys(children);
    };

    this.getDescendants = function(descendants) {
	for (var child in children) {
	    descendants.push(children[child].getName());
	    children[child].getDescendants(descendants);
	}
	return descendants;
    };

    this.hasChildren = function() {
	return Object.keys(this).length > 0;
    };

    this.addChild = function(node) {
	if (node.isDescendant(this)) {
	    throw new Error("Node " + node.getName() + " is a descendant of " + this.getName());
	}
	children[node.getName()] = node;
    };

    this.getName = function() {
	return name;
    };

    this.asString = function() {
	var string = "{name:\"" + name + "\", children: [";
	for (var child in children) {
	    string = string + children[child].asString();
	}
	return string + "]}";
    };

    console.log("new DagNode object instantiated");
    return this;
}

var premierLeagueNode = new DagNode("Premier League");
var manUNode = new DagNode("Manchester United");
var arsenalNode = new DagNode("Arsenal");
var rooneyNode = new DagNode("Rooney");

premierLeagueNode.addChild(manUNode);
premierLeagueNode.addChild(arsenalNode);
manUNode.addChild(rooneyNode);
rooneyNode.addChild(premierLeagueNode); // should throw an error

console.log(premierLeagueNode.asString());    


