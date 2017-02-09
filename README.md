# generator-aem-flavour [![NPM version][npm-image]][npm-url]
> AEM Flavour is a project scaffolding that is used to kickstart new AEM 6.x projects.

## Requirements:
* AEM 6.x
* Java 8 
* Maven 3.x
* Node JS 6.x 
* Git

## Installation
First, install [Yeoman](http://yeoman.io) and generator-aem-flavour using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-aem-flavour
```

Then generate your new project:

```bash
yo aem-flavour
```
## Why AEM-Flavour
There are many scaffolding tools which makes project creation easier. But, AEM-Flavour goes a step further and helps you in bootstrapping all the requirements of an AEM project.
High lights:
* Front-end build for client libraries
* Powerful and highly extensible page list component
* Templates/Page components
* OOTB components
* Written in java 8 leveraging lambdas and stream API

## Why front end build
Though AEM allows to manage client libraries, what it offers is pretty much limited. With the dominance of Node and NPM in front-end, it has become a necessity to use node modules in our front-end build. So now the question for AEM developer is what are node modules? they are just a piece of Javascript code written by a developer and hosted in NPM (Node Package Manager) which can be used in their code as a module. When this is writing there are around half a million of packages which are been published. 

Advantages of using front end build in AEM

* You can use CSS/JS extensions like SCSS, SASS, coffee script, typescript etc.
* You can lint your code and run front end test pretty easily.
* You can manage vendor client libraries using bower to manage versions and dependencies with ease. And also by using this you are not going to pollute your source code with lots of vendor library files.
* Minify and concatenate libraries easily and can attach a build profile to manage them. (Like for dev no need to concatenate and minify but for production profile client libraries should be minified and concatenated) and lot more..

## How does this work?
There is a new maven module called frontend where all the client libraries are stored.

#### aem_components (Folder)
All the global and component specific client libraries are placed inside components and global folders respectively. All the JS files have to be kept under scripts folder and SCSS has to be kept under styles folder. For reference go through the components that are provided by this framework.

#### gulpfile.js:
Gulp is a build system that automates list of tasks. This is more or less like a maven build, which has list of tasks to be done. The task can be anything like compile SCSS, compile typescript, concatenate etc. For writing own task refer [gulp](http://gulpjs.com/) .

#### bower.json: 
This file contains all the necessary information about the list of vendor libraries and their versions. To add a new vendor library check the bower command in vendors website. For example if you want to install angular JS, you have give _bower install angular —save_ inside frontend folder. This will add a dependency in the bower.json file.

#### package.json
This file contains all the npm dependencies that are required for gulp task builder.

#### pom.xml
This has a maven-frontend-plugin which is used to run multiple frontend build tasks. To run all the tasks give mvn package.

### Finally in a nutshell
When _mvn package_ command is given in frontend module

1. It reads bower.json file and downloads all the vendor dependencies.

2. Concatenate/minify vendor library files and move them to AEM ./designs

3. Read all the application specific client libraries from aem_components folder, concatenate CSS/JS files and moves them to AEM ./designs

## New Page List Component
Content hierarchy is the most important when it comes to AEM content management. Proper structuring of website plays a vital role in maintaining CMS. From the inception of AEM one of the most important component is List, because it provides various options to show the structured content to the end user in different formats. OOTB list component is very powerful and provides multiple functionalities to get the contents of the page based on the requirement. But what inspired me to create this new page list component is, to ease the extensibility. OOTB foundation component libs/foundation/list is written in JSP with scriplets and it's difficult to extend or modify the component and with new sightly component which is from libs/wcm/foundation is totally written in JS and lacks object oriented programming advantages. 
Typically customization is required for display logic to show different views for a list component. 

This new page list component comes with two basic views
* Thumbnail view (Bootstrap)
* Link view

### Features of new page list component
* Highly extensible
* Used functional programming and abstraction
* Used java generics factory design pattern
* Written in sightly by using java as backend
* Written in java 8 leveraging lambdas and stream API
* Less than 150 lines of core code (less code -> less error prone)

## Page Components (Template components)
AEM-Flavour provides 
#### Base page component
This page component doesn’t relate with any of the template and is used to extend other page components.

#### Content page component
This page component is extended from base page component. In this component content.html is been overridden by the one from base page component. 

## Header Component
Header component contains navigation, and language selection dropdown. This is been developed using bootstrap nav classes to ease the customization. This component is used in iparsys of content page template

## Footer Component
This is very basic component which has a black background with parsys.

## Carousel Component
This component is inspired with the new page list component and has the similar functionality with additional carousal specific features like auto play speed and it has a  view called single view. This can be extended similar to the page list component.

## Column Control Component
This component is built with bootstrap based grid system. There is no design mode to configure the list of options to get in edit, because this is developed by considering AEM template editor which give more control over the components behaviour.

## Call to Action Component
This component is used to create buttons/links for your website and is been developed using bootstrap classes.

## Raw HTML Component
This is a very basic component that has text area as input in the dialog where author can place HTML.

## Adobe OOTB Components
* Title Component
* Image Component
* Text
* Text and Image Component

## Common Issues
#### Build failure
**Forntend module**
Forntend module requires Bower to download vendor libraries. Bower is dependent on git to download libraries from bower's git repository. Make sure to install git and available to the windows environment variable. To quickly check open command prompt and give _git_ command, it should show the usage and options.

## Inspiration
Adobe [aem-granite-archetype](https://github.com/Adobe-Marketing-Cloud/aem-project-archetype)

Jhipster

## License

MIT © [kalyan venkat varanasi](https://github.com/kalyan21)


[npm-image]: https://badge.fury.io/js/generator-aem-flavour.svg
[npm-url]: https://npmjs.org/package/generator-aem-flavour
[travis-image]: https://travis-ci.org/update!!/generator-aem-flavour.svg?branch=master
[travis-url]: https://travis-ci.org/update!!/generator-aem-flavour
[daviddm-image]: https://david-dm.org/update!!/generator-aem-flavour.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/update!!/generator-aem-flavour
[coveralls-image]: https://coveralls.io/repos/update!!/generator-aem-flavour/badge.svg
[coveralls-url]: https://coveralls.io/r/update!!/generator-aem-flavour
