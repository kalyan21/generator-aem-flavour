'use strict';

const mkdirp = require('mkdirp');
const constants = require('./generator-constants');

module.exports = {
    writeFiles
};

var javaDir;
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
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/components/_PageListComponent.java'),
                this.destinationPath(javaDir + '/components/PageListComponent.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/components/_HeaderComponent.java'),
                this.destinationPath(javaDir + '/components/HeaderComponent.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/components/_BaseComponent.java'),
                this.destinationPath(javaDir + '/components/BaseComponent.java'), {
                    packageName: this.packageName
                }
            );
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
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/list/views/_ThumbnailContentViewPageList.java'),
                this.destinationPath(javaDir + '/list/views/ThumbnailContentViewPageList.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/list/views/_SingleViewCarousal.java'),
                this.destinationPath(javaDir + '/list/views/SingleViewCarousal.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/list/views/_LinkViewPageList.java'),
                this.destinationPath(javaDir + '/list/views/LinkViewPageList.java'), {
                    packageName: this.packageName
                }
            );
        },

        writeCoreModels: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/models/_ThumbnailContentViewModel.java'),
                this.destinationPath(javaDir + '/models/ThumbnailContentViewModel.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/models/_LanguagesModel.java'),
                this.destinationPath(javaDir + '/models/LanguagesModel.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/models/_LinkModel.java'),
                this.destinationPath(javaDir + '/models/LinkModel.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/models/_ImageModel.java'),
                this.destinationPath(javaDir + '/models/ImageModel.java'), {
                    packageName: this.packageName
                }
            );
        },

        writeCoreServices: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/_AbstractPageList.java'),
                this.destinationPath(javaDir + '/services/AbstractPageList.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/_NavigationService.java'),
                this.destinationPath(javaDir + '/services/NavigationService.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/_VanillaCoreService.java'),
                this.destinationPath(javaDir + '/services/VanillaCoreService.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/_ListFactory.java'),
                this.destinationPath(javaDir + '/services/ListFactory.java'), {
                    packageName: this.packageName
                }
            );
        },

        writeCoreServicesImpl: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/impl/_NavigationServiceImpl.java'),
                this.destinationPath(javaDir + '/services/impl/NavigationServiceImpl.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/impl/_VanillaCoreServiceImpl.java'),
                this.destinationPath(javaDir + '/services/impl/VanillaCoreServiceImpl.java'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_CORE_MAIN_SRC_DIR + '/services/impl/_ListFactoryImpl.java'),
                this.destinationPath(javaDir + '/services/ListFactory.java'), {
                    packageName: this.packageName
                }
            );
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
        }

    }
}
