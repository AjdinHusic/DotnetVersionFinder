const core = require("@actions/core");
const github = require("@actions/github");
const { readFileSync, readdirSync } = require("fs");
const { parseString } = require("xml2js");

try {
  const path = core.getInput("path");

  // Log current working directory
  console.log("Current working directory:", process.cwd());

  // Log files and folders in the current working directory
  console.log(
    "Files and folders in the current working directory:",
    readdirSync(process.cwd()).join(", ")
  );

  const file = readFileSync(path);

  parseString(file, (err, result) => {
    core.setOutput(
      "version",
      result["Project"]["PropertyGroup"][0]["Version"][0]
    );
  });
} catch (error) {
  console.log(error);
  core.setFailed(error.message);
  //core.setFailed(error.message);
}
