'use strict';

const mkdirp = require('mkdirp');
const constants = require('./generator-constants');

module.exports = {
    writeFiles
};

var javaDir;
var coreComponentsList = [
    'PageListComponent.java',
    'HeaderComponent.java',
    'BaseComponent.java'
];

var coreListViews = [
    'ThumbnailContentViewPageList.java',
    'SingleViewCarousal.java',
    'LinkViewPageList.java'
];

var coreModels = [
    'ThumbnailContentViewModel.java',
    'LanguagesModel.java',
    'LinkModel.java',
    'ImageModel.java'

];
var coreServices = [
    'AbstractPageList.java',
    'NavigationService.java',
    'VanillaCoreService.java',
    'ListFactory.java'
];

var coreServicesImpls = [
    'NavigationServiceImpl.java',
    'VanillaCoreServiceImpl.java',
    'ListFactoryImpl.java'
];

var contentComponentsList = [
    'calltoaction',
    'carousal',
    'columncontrol',
    'footer',
    'header',
    'helloworld',
    'image',
    'list',
    'rawhtml',
    'text',
    'textimage',
    'title'
];

function writeFiles() {
    return {

        setUpJavaDir() {
            javaDir = this.javaDir = constants.CORE_MAIN_SRC_DIR + this.packageFolder + '/';
        },

        writeGlobalFiles: function () {
            this.fs.copyTpl(
                this.templatePath('_pom.xml'),
                this.destinationPath('pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    description: this.description,
                }
            );
            this.fs.copy(
                this.templatePath('.gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('README.md'),
                this.destinationPath('README.md')
            );
        },

        writeCorePom: function () {
            this.fs.copyTpl(
                this.templatePath('core/_pom.xml'),
                this.destinationPath('core/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                }
            );
        },

        writeCoreComponents: function () {
            coreComponentsList.forEach(function (componentClassName) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/components/_' + componentClassName),
                    this.destinationPath(javaDir + '/components/' + componentClassName), {
                        packageName: this.packageName
                    }
                );
            }, this);
        },

        writeCoreConstants: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/constants/_VanillaConstants.java'),
                this.destinationPath(javaDir + '/constants/VanillaConstants.java'), {
                    packageName: this.packageName
                }
            );
        },

        writeCoreList: function () {
            coreListViews.forEach(function (listViewClassNames) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/list/views/_' + listViewClassNames),
                    this.destinationPath(javaDir + '/list/views/' + listViewClassNames), {
                        packageName: this.packageName
                    }
                );
            }, this);
        },

        writeCoreModels: function () {
            coreModels.forEach(function (modelClassNames) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/models/_' + modelClassNames),
                    this.destinationPath(javaDir + '/models/' + modelClassNames), {
                        packageName: this.packageName
                    }
                );
            }, this);
        },

        writeCoreServices: function () {
            coreServices.forEach(function (servicesClassNames) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/_' + servicesClassNames),
                    this.destinationPath(javaDir + '/services/' + servicesClassNames), {
                        packageName: this.packageName
                    }
                );
            }, this);
        },

        writeCoreServicesImpl: function () {
            coreServicesImpls.forEach(function (servicesImplsClassNames) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/impl/_' + servicesImplsClassNames),
                    this.destinationPath(javaDir + '/services/impl/' + servicesImplsClassNames), {
                        packageName: this.packageName
                    }
                );
            }, this);
        },

        writeCoreUtils: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/utils/_VanillaUtils.java'),
                this.destinationPath(javaDir + '/utils/VanillaUtils.java'), {
                    packageName: this.packageName
                }
            );
        },

        writeFrontendAEMComponents: function () {
            this.fs.copy(
                this.templatePath('frontend/aem_components'),
                this.destinationPath('frontend/aem_components')
            );
        },

        writeFrontendBowerFile: function () {
            this.fs.copyTpl(
                this.templatePath('frontend/_bower.json'),
                this.destinationPath('frontend/bower.json'), {
                    artifactName: this.artifactName
                }
            );
        },

        writeFrontendBowerFile: function () {
            this.fs.copyTpl(
                this.templatePath('frontend/_gulpfile.js'),
                this.destinationPath('frontend/gulpfile.js'), {
                    appsFolderName: this.appsFolderName
                }
            );
        },

        writeFrontendPackageFile: function () {
            this.fs.copyTpl(
                this.templatePath('frontend/_package.json'),
                this.destinationPath('frontend/package.json'), {
                    artifactName: this.artifactName
                }
            );
        },

        writeFrontendPOMFile: function () {
            this.fs.copyTpl(
                this.templatePath('frontend/_pom.xml'),
                this.destinationPath('frontend/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                }
            );
        },

        writeUIAppsPOMFile: function () {
            this.fs.copyTpl(
                this.templatePath('ui.apps/_pom.xml'),
                this.destinationPath('ui.apps/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                }
            );
        },

        writeUIAppsContentMETA_INF_Config: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/config.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/config.xml')
            );
        },

        writeUIAppsContentMETA_INF_Settings: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/settings.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/settings.xml')
            );
        },

        writeUIAppsContentMETA_INF_Filter: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/_filter.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_CONTENT + '/META-INF/vault/filter.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
        },

        writeUIAppsSlingAndContentFile: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/sling'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/sling')
            );
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/.content.xml')
            );
        },

        /**This method by default ignore .content files. These files needs to be copied based on template */
        writeUIAppsProjectFolder: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName)
            );
        },

        /**Code to copy .content files of each */
        writeUIAppsContentFiles: function () {
            contentComponentsList.forEach(function (componentName) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/' + componentName + '/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/' + componentName + '/.content.xml'), {
                        componentGroupName: this.componentGroupName
                    }
                );
            }, this);
        },

        writeUIAppsStructureFiles: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/structure/basepage/partials/headlibs.html'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/structure/basepage/partials/headlibs.html'), {
                    appsFolderName: this.appsFolderName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/structure/basepage/partials/footlibs.html'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/structure/basepage/partials/footlibs.html'), {
                    appsFolderName: this.appsFolderName
                }
            );
        }

    }
}