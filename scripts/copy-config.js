var fs = require('fs');
var path = require('path');
var xcode = require('xcode');

function copyConfig_ios(projectRoot, config) {
    var mainDirectory = path.join(projectRoot, 'platforms', 'ios');
    if (!fs.existsSync(mainDirectory)) {
        console.error('[Airbridge Cordova SDK] ios project folder is not found!');
        process.exit(1);
    }

    var projectFileName = fs.readdirSync(mainDirectory).find(function (file) {
        if (/^.*\.xcodeproj$/.test(file)) {
            return file;
        }
    })
    var projectName = projectFileName.substring(0, projectFileName.length - '.xcodeproj'.length);

    // copy airbridge.json
    var resourcesDirectory = path.join(mainDirectory, projectName, 'Resources');
    if (!fs.existsSync(resourcesDirectory)) {
        fs.mkdirSync(resourcesDirectory);
    }

    var targetFile = path.join(resourcesDirectory, 'airbridge.json');
    fs.writeFileSync(targetFile, config);


    // modify xcode project
    var pbxFile = path.join(mainDirectory, projectFileName, 'project.pbxproj');
    if (!fs.existsSync(pbxFile)) {
        console.error('[Airbridge Cordova SDK] ios project file is not found!');
        process.exit(1);
    }

    var project = xcode.project(pbxFile);
    project.parse(function (error) {
        if (error) {
            console.error('[Airbridge Cordova SDK] fail to add airbridge.json to ios project file');
            return;
        }

        project.addResourceFile(targetFile);

        fs.writeFileSync(pbxFile, project.writeSync());

        console.log('[Airbridge Cordova SDK] Copy config to ios project');
    })
}

function copyConfig_android(projectRoot, config) {
    // copy airbridge.json
    var mainDirectory = path.join(projectRoot, 'platforms', 'android', 'app', 'src', 'main');
    if (!fs.existsSync(mainDirectory)) {
        console.error('[Airbridge Cordova SDK] android project folder is not found!');
        process.exit(1);
    }

    var assetsDirectory = path.join(mainDirectory, 'assets');
    if (!fs.existsSync(assetsDirectory)) {
        fs.mkdirSync(assetsDirectory)
    }

    var targetFile = path.join(assetsDirectory, 'airbridge.json');
    
    fs.writeFileSync(targetFile, config);

    console.log('[Airbridge Cordova SDK] Copy config to android project');
}

module.exports = function (context) {
    var projectRoot = context.opts.projectRoot;
    var platforms = context.opts.platforms || context.opts.cordova.platforms;

    if (!(fs.existsSync(projectRoot) && Array.isArray(platforms))) {
        console.error('[Airbridge Cordova SDK] cordova project folder is not found!');
        process.exit(1);
    }

    var airbridgeFile = path.join(projectRoot, 'airbridge.json');
    if (!fs.existsSync(airbridgeFile)) {
        fs.writeFileSync(airbridgeFile, "{}");
    }
    var config = fs.readFileSync(airbridgeFile);

    platforms.forEach(function (platform) {
        if (platform === 'ios') {
            copyConfig_ios(projectRoot, config);
        } else if (platform === 'android') {
            copyConfig_android(projectRoot, config);
        }
    })

}