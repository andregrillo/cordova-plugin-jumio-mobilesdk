const fs = require("fs");
const path = require("path");

function GradleProperties(platformRoot) {

    const projectBuildFile = path.join(platformRoot, "gradle.properties");

    //let fileContents = fs.readFileSync(projectBuildFile, "utf8");
    let newLine = "\n"+"android.jetifier.blacklist=bcprov-jdk15on"+"\n";

    fs.appendFileSync(projectBuildFile, newLine, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          // Get the file contents after the append operation
          console.log("\nDone");
        }
    })
}

module.exports = context => {
    "use strict";
    const platformRoot = path.join(context.opts.projectRoot, "platforms/android");

    return new Promise((resolve, reject) => {
        GradleProperties(platformRoot);
        resolve();
    });
};