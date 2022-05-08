const http = require("http");

const expressApp = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

//the express app is just a fancy listener function for the node http server
const server = http.createServer(expressApp);

function startServer() {
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

//we will block here till the loading of planets data is complete before listening to the server calls
loadPlanetsData().then(() => {
  startServer();
});

console.log(PORT);
