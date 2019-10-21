function feedGenerator(nb) {
  let res = [];
  for (var i = 1; i <= nb; i++) {
    res.push(generateFeed());
  }
  return res;
}

function generateFeed() {
  return {
    name: "PS4 Death Squared",
    content: "Пати-игра от 2 до 4 человек"
  };
}

export default feedGenerator(9);
