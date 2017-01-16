'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var prompts = require('./prompts');
var writeFiles = require('./files').writeFiles;

module.exports = Generator.extend({

  prompting: {
    askForGroupId: prompts.askForGroupId,
    askForArtifactId: prompts.askForArtifactId,
    askForVersion: prompts.askForVersion,
    askForPackage: prompts.askForPackage,
    askForAppsFolderName: prompts.askForAppsFolderName,
    askForArtifactName: prompts.askForArtifactName,
    askForComponentGroupName: prompts.askForComponentGroupName,
    askForContentFolderName: prompts.askForContentFolderName,
    askForPackageGroup: prompts.askForPackageGroup,
    askForSiteName: prompts.askForSiteName,
  },

  configureGlobal: function () {
    this.packageFolder = this.packageName.replace(/\./g, '/');
  },

  writing: writeFiles(),

  install: function () {
    this.installDependencies();
  }
});
