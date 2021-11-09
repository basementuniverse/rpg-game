// Given start and finish vec2, find a path in map m and return an array of vec2
function astar(start, finish, m, tl, br) {
	const nodes = {},
		open = [],
		closed = [],
		wall = (x, y) => (
			m[vec2.toString(vec2(x, y))] === 1 || x < tl.x || x > br.x || y < tl.y || y > br.y
		),
		heuristic = function(x, y) {
			return Math.abs(finish.x - x) + Math.abs(finish.y - y);
		},
		remove = function(list, item) {
			for (let i = list.length; i--;) {
				if (list[i].x == item.x && list[i].y == item.y) {
					list.splice(i, 1);
					return;
				}
			}
		},
		node = function(x, y) {
			var h = x + "_" + y;
			if (!nodes[h]) { nodes[h] = { x: x, y: y, f: 0, g: 0, h: 0, parent: null }; }
			return nodes[h];
		},
		neighbours = function(n) {
			var result = [];
			if (n.x > 0 && !wall(n.x - 1, n.y)) {	result.push(node(n.x - 1, n.y)); }
			if (!wall(n.x + 1, n.y)) {				result.push(node(n.x + 1, n.y)); }
			if (n.y > 0 && !wall(n.x, n.y - 1)) {	result.push(node(n.x, n.y - 1)); }
			if (!wall(n.x, n.y + 1)) {				result.push(node(n.x, n.y + 1)); }
			return result;
		};
	open.push({ x: start.x, y: start.y, f: 0, g: 0, h: 0, parent: null });
	while (open.length > 0) {
		let currentNode = open[0];
		for (let i = open.length; i--;) {
			if (open[i].f < currentNode.f) {
				currentNode = open[i];
			}
		}
		if (currentNode.x == finish.x && currentNode.y == finish.y) {
			let c = currentNode,
				solution = [];
			while (c.parent) {
				solution.push(c);
				c = c.parent;
			}
			return solution.reverse();
		}
		remove(open, currentNode);
		closed.push(currentNode);
		let n = neighbours(currentNode);
		for (let i = n.length; i--;) {
			if (closed.findIndex(k => n[i].x == k.x && n[i].y == k.y) > -1) {
				continue;
			}
			let g = currentNode.g + 1,
				lowest_g = false;
			if (open.findIndex(k => n[i].x == k.x && n[i].y == k.y) == -1) {
				lowest_g = true;
				n[i].h = heuristic(n[i].x, n[i].y);
				open.push(n[i]);
			} else if (g < n[i].g) {
				lowest_g = true;
			}
			if (lowest_g) {
				n[i].parent = currentNode;
				n[i].g = g;
				n[i].f = n[i].g + n[i].h;
			}
		}
	}
	return [];
}
