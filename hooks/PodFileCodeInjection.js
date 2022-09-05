var fs = require('fs'), path = require('path');

module.exports = function(context) {
    var podfile = path.join(context.opts.projectRoot, "platforms", "ios", "Podfile");  
    if (fs.existsSync(podfile)) {
     
      fs.readFile(podfile, 'utf8', function (err,data) {
        
        if (err) {
          throw new Error('🚨 Unable to read Podfile: ' + err);
        }
        
        var result = data;
        var shouldBeSaved = false;

        if (!data.includes("BUILD_LIBRARY_FOR_DISTRIBUTION")){
          shouldBeSaved = true;
          result = data.replace(/end/g, "end\npost_install do |installer|\n\tinstaller.pods_project.targets.each do |target|\n\t\tif ['iProov', 'Socket.IO-Client-Swift', 'Starscream'].include? target.name\n\t\t\ttarget.build_configurations.each do |config|\n\t\t\t\t\tconfig.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'\n\t\t\tend\n\t\tend\n\tend\nend");
        } else {
          console.log("⚠️ Podfile already modified");
        }

        if (shouldBeSaved){
          fs.writeFile(podfile, result, 'utf8', function (err) {
          if (err) 
            {throw new Error('🚨 Unable to write into Podfile: ' + err);}
          else 
            {console.log("✅ Jumio Plugin - Podfile edited successfuly");}
        });
        }

      });
    } else {
        throw new Error("🚨 WARNING: Podfile was not found. The build phase may not finish successfuly");
    }
  }
