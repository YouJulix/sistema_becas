# Sistema de Asignación de becas de NovaUniversitas

### Tecnologías ocupadas
* HTML 5  
* CSS 3  
* JavaScript  
* JQuery  
* AngularJS  
* NodeJS  
* MongoDB

### Estructura del proyecto
* app  
  * core
  * img  
  * js  
    * lib   
     * jquery.js  
     * angular.js  
     * angular-route.js  
     * ...  
  * css  
   * style.css
  * module1  
  * module2  
  * ...
* index.html  
* app.module.js  
* app.config.js

### Estándares
* El nombre de variables, funciones, clases, id's utilizará el formato **camelCase** (e.g myAwesomeComponent)  
* Cada modulo deberá estar dentro de una carpeta(la cual a su vez estará dentro de _app_ ) con el nombre del modulo en formato **kebab-case** (e.g. my-awesome-component)    
* Cada modulo deberá contener los 3 siguientes archivos:  
 * _nombremodulo_-module.js   
 * _nombremodulo_-component.js  
 * _nombremodulo_-template.html  
* Los archivos dde tipo template no utilizarán el atributo _style_ , si son necesarios los estilos, estos se colocarán dentro de la carpeta _css/_ y llevarán comentarios al inicio del código sobre el componente que están modificando.
* Dentro de cada controlador no se ocupará directamente la variable _this_ en vez de esto se utilizará una variable auxiliar: _var self = this;_

### Enlace a tablero kanban con tareas asignadas

[Tablero kanban](http://yuk0781.000webhostapp.com/kanboard)

 
