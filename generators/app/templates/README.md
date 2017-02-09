## <%=artifactName%> AEM project

<%=projectDescription%>

## Modules

The main parts of the template are:

* core: Java bundle containing all core functionalities like OSGi services, component use classes, utilities
* frontend: contains all client libraries for the application which are maintained through gulp and bower.
* ui.apps: contains the /apps and /etc parts of the project, ie components, templates, designs etc.
* ui.content: contains sample content

## Technology Stack

#### Frontend
* [Node](https://nodejs.org/en/)  Node is a JavaScript runtime used for frontend build
* [Gulp](http://gulpjs.com/): The frontend build framework more or less like a maven/gradel in java space
* [Sass](http://sass-lang.com/): An extension of CSS that adds power and elegance to the basic language.
* [Bootstrap](http://getbootstrap.com/): HTML, CSS, and JS framework
* [Slick](http://kenwheeler.github.io/slick/): JS library for making carousels for the web

#### Backend
* Java 8: This project uses Java 8 
* [Maven](https://maven.apache.org/): Build and dependency management framework for Java/AEM code

## How to build project

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with  
```bash
mvn clean install -PautoInstallPackage
```
    
Or to deploy it to a publish instance, run
```bash
mvn clean install -PautoInstallPackagePublish
``` 
Or to deploy only the bundle to the author, run
```bash
mvn clean install -PautoInstallBundle
``` 

## How to build only frontend modules

For any changes in the client library files inside frontend module has to be moved to AEM ./designs to do this run. This can be extended using gulp watch, which takes care of this task when a file is saved.
```bash
mvn clean package
``` 


