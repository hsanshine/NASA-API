const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.models");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const newLaunch = req.body; //already parsed by express.json()
  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.target
  ) {
    return res.status(400).json({ error: "Missing required Launch Data" });
  }
  newLaunch.launchDate = new Date(newLaunch.launchDate);
  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: "Invalid mission date" });
  }
  // if (newLaunch.launchDate.toString() === "Invalid Date") {
  //   return res.status(400).json({ error: "Invalid launch date" });
  // }

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

function httpAbortLaunch(req, res) {
  const flightNumber = Number(req.params.id);
  console.log(flightNumber);

  //if launch not found
  if (!existsLaunchWithId(flightNumber)) {
    return res.status(400).json({
      error: "Launch does not exist",
    });
  }

  //if launch if found it is delete
  const aborted = abortLaunchById(flightNumber);
  res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
