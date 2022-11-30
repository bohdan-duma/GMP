process.stdin.addListener("data", (data) =>
  console.log(data.reverse().toString())
);
