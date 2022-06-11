var indices = [];
var tableau = ['a', 'b', 'a', 'c', 'a', 'd'];
var élément = 'a';
var idx = tableau.indexOf(élément);
console.log(idx);
while (idx != -1) {
  indices.push(idx);
  idx = tableau.indexOf(élément, idx + 1);
}
console.log(indices);
// [0, 2, 4]