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
                this.templatePath('.npmignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('README.md'),
                this.destinationPath('README.md')
            );
        },

        /**Write functions for core module */
        writeCorePom: function () {
            this.fs.copyTpl(
                this.templatePath('core/_pom.xml'),
                this.destinationPath('core/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                    appsFolderName: this.appsFolderName
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

        /**Write functions for frontend module */
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
                    appsFolderName: this.appsFolderName
                }
            );
        },

        writeFrontendGulpFile: function () {
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
                    appsFolderName: this.appsFolderName
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

        /**Write functions for ui.apps module */
        writeUIAppsPOMFile: function () {
            this.fs.copyTpl(
                this.templatePath('ui.apps/_pom.xml'),
                this.destinationPath('ui.apps/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                    packageGroup: this.packageGroup,
                    appsFolderName: this.appsFolderName
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
        /**Code to copy dynamic component html files in which java package is used */
        writeUIAppsDynamicComponents: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/carousal/carousal.html'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/carousal/carousal.html'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/header/header.html'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/header/header.html'), {
                    packageName: this.packageName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/list/list.html'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/list/list.html'), {
                    packageName: this.packageName
                }
            );
        },
        /**Code to copy .content files of each component*/
        writeUIAppsContentFiles: function () {
            /**All content components */
            contentComponentsList.forEach(function (componentName) {
                this.fs.copyTpl(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/' + componentName + '/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/' + componentName + '/.content.xml'), {
                        componentGroupName: this.componentGroupName
                    }
                );
                /**This code add for touch UI dialog .content  */
                /**carousal touch ui dialog */
                this.fs.copy(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/carousal/_cq_dialog/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/carousal/_cq_dialog/.content.xml')
                );
                /**columncontrol touch ui dialog */
                this.fs.copy(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/columncontrol/_cq_dialog/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/columncontrol/_cq_dialog/.content.xml')
                );
                /**header touch ui dialog */
                this.fs.copy(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/header/_cq_dialog/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/header/_cq_dialog/.content.xml')
                );
                /**list touch ui dialog */
                this.fs.copy(
                    this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/content/list/_cq_dialog/.content.xml'),
                    this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/content/list/_cq_dialog/.content.xml')
                );

            }, this);
            /**Copy .content files for structure/page components */
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/structure/basepage/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/structure/basepage/.content.xml')
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/components/structure/contentpage/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/components/structure/contentpage/.content.xml'), {
                    appsFolderName: this.appsFolderName,
                    siteName: this.siteName
                }
            );
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
        },

        writeUIAppsConfig: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/config/org.apache.sling.commons.log.LogManager.factory.config-project.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/config/org.apache.sling.commons.log.LogManager.factory.config-project.xml'), {
                    appsFolderName: this.appsFolderName,
                    packageName: this.packageName
                }
            );
        },

        writeUIAppsTemplates: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/_vanilla/templates/contentpage/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/apps/' + this.appsFolderName + '/templates/contentpage/.content.xml'), {
                    appsFolderName: this.appsFolderName,
                    artifactName: this.artifactName
                }
            );
        },

        writeEtcDesignsFolder: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/_vanilla'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/' + this.appsFolderName)
            );
        },

        writeEtcDesignsContent: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/_vanilla/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/' + this.appsFolderName + '/.content.xml'), {
                    siteName: this.siteName,
                    componentGroupName: this.componentGroupName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/_vanilla/clientlib-all/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/' + this.appsFolderName + '/clientlib-all/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/_vanilla/clientlib-vendor/.content.xml'),
                this.destinationPath(constants.VANILLA_APPS_MAIN_JCR_ROOT + '/etc/designs/' + this.appsFolderName + '/clientlib-vendor/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
        },

        /**Write functions for ui.content module*/
        writeUIContentPOMFile: function () {
            this.fs.copyTpl(
                this.templatePath('ui.content/_pom.xml'),
                this.destinationPath('ui.content/pom.xml'), {
                    groupId: this.groupId,
                    artifactId: this.artifactId,
                    version: this.version,
                    artifactName: this.artifactName,
                    packageGroup: this.packageGroup
                }
            );
        },

        writeUIContentMETA_INF_Config: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/config.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/config.xml')
            );
        },

        writeUIContentMETA_INF_Settings: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/settings.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/settings.xml')
            );
        },

        writeUIContentMETA_INF_Filter: function () {
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/_filter.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_CONTENT + '/META-INF/vault/filter.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
        },

        writeUIContentDAM: function () {
            this.fs.copy(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/_vanilla'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/' + this.contentFolderName)
            );
            /**Copy content files for dam */
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/_vanilla/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/' + this.contentFolderName + '/.content.xml'), {
                    contentFolderName: this.contentFolderName
                }
            );
            this.fs.copy(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/_vanilla/images/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/' + this.contentFolderName + '/images/.content.xml')
            );
            this.fs.copy(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/_vanilla/images/default_image.png/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/dam/' + this.contentFolderName + '/images/default_image.png/.content.xml')
            );
        },

        writeUIContentPages: function () {
            /**Copy content files from dam */
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/.content.xml'), {
                    appsFolderName: this.appsFolderName,
                    artifactName: this.artifactName,
                    contentFolderName: this.contentFolderName
                }
            );
            /**Copy en pages .content files */
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/en/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/en/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/en/test1/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/en/test1/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/en/test1/test1-1/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/en/test1/test1-1/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/en/test2/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/en/test2/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
            /**Copy fr pages .content files */
            this.fs.copyTpl(
                this.templatePath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/_vanilla/fr/.content.xml'),
                this.destinationPath(constants.VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT + '/' + this.contentFolderName + '/fr/.content.xml'), {
                    appsFolderName: this.appsFolderName
                }
            );
        },


    }
}