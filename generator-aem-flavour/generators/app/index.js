'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');

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

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    this.fs.copy(
      this.templatePath('.ignore'),
      this.destinationPath('.ignore')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
