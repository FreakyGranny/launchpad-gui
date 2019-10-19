function feedGenerator(nb) {
  let res = [];
  for (var i = 1; i <= nb; i++) {
    res.push(generateFeed());
  }
  return res;
}

function generateFeed() {
  return {
    name: "Bender Rodriges",
    content: "some words"
  };
}

export default feedGenerator(5);
