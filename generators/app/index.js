'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var prompts = require('./prompts');
var writeFiles = require('./files').writeFiles;
var header = require('./header').writeHeader;

module.exports = Generator.extend({

  initializing: header(),

  prompting: {
    askForArtifactName: prompts.askForArtifactName,
    askForProjectDescription: prompts.askForProjectDescription,
    askForGroupId: prompts.askForGroupId,
    askForArtifactId: prompts.askForArtifactId,
    askForVersion: prompts.askForVersion,
    askForPackage: prompts.askForPackage,
    askForAppsFolderName: prompts.askForAppsFolderName,
    askForComponentGroupName: prompts.askForComponentGroupName,
    askForContentFolderName: prompts.askForContentFolderName,
    askForPackageGroup: prompts.askForPackageGroup,
    askForSiteName: prompts.askForSiteName,
  },

  configureGlobal: function () {
    this.packageFolder = this.packageName.replace(/\./g, '/');
  },

  writing: writeFiles(),

  end: function () {
    this.log('\n')
    this.log(chalk.yellow('Yeoman AEM-flavour generator has created ' + chalk.cyan(this.artifactName) + ' project. Please run') + chalk.green(' mvn clean install -PautoInstallPackage') + chalk.yellow(' to install ' + chalk.cyan(this.artifactName) + ' project in localhost:4502 instance.'));
  }
});
