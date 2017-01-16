'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');
var mkdirp = require('mkdirp');

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

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
