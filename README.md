# Sistema de Asignación de becas de NovaUniversitas

### Tecnologías ocupadas
* HTML 5  
* CSS 3  
* JavaScript  
* JQuery 3.2
* MEAN
 * MongoDB 3.4
 * Express JS 4.0
 * AngularJS 1.6
 * Node JS 4.2

### Estructura del proyecto
* server.js
* package.json
* config
  * db.js
* routes  
  * users-api  
    * users.controller.js
    * users.schema.js
    * users.routes.js
* node_modules
* public  
  * core
  * img  
  * lib  
    * angular
      * angular.js
      * angular-route.js
    * bootstrap
      * bootstrap.css
     
    * jquery  
      * jquery.js
  * js  
  * css  
    * style.css
  * module-1  
    * _module-1_.module.js  
    * _module-1_.component.js
    * _module-1_.template.html
  * module-2  
    * _module-2_.module.js  
    * _module-2_.component.js
    * _module-2_.template.html
  * index.html  
  * app.module.js  
  * app.config.js
* example_MyFIRST-API-REST_angular_node_mongodb
* example_angular-phonecat

### Estándares
1. El nombre de variables, funciones, clases, id's utilizará el formato **camelCase** (e.g myAwesomeComponent)  
2. Cada modulo deberá estar dentro de una carpeta(la cual a su vez estará dentro de _app_ ) con el nombre del modulo en formato **kebab-case** (e.g. my-awesome-component)    
3. Cada modulo deberá contener los 3 siguientes archivos:  
  3.1 _nombremodulo_-module.js   
  3.2 _nombremodulo_-component.js  
  3.3 _nombremodulo_-template.html  
4. Los archivos html no utilizarán el atributo _style_ , si son necesarios los estilos, estos se colocarán dentro de la carpeta _css/_ y llevarán comentarios al inicio del código sobre el componente que están modificando.  
5. Para la segmentación del contenido se utilizará el sistema de rejilla de _bootstrap_ (No es necesario utilizar sus demás estilos).
6. Dentro de cada controlador no se ocupará directamente la variable _this_ en vez de esto se utilizará una variable auxiliar: _var self = this;_   
7. El tamaño de identación(tabulador) será: 4   
8. Los routers que correspondan a cada página se agregarán en el archivo archivo: _app.config.js_  
9. Los modulos que se creen se deberán ligar con el modulo principal de la aplicación _app.module.js_  
10. Los componentes que cada quien cree se dibujarán dentro del div con la directiva ngView del archivo index.html. 
11. La ruta donde se creará la base de datos de mongoDB será en (http://localhost:27017)
12. La ruta donde node js habilitará el servidor será en (http://localhost:3000)
13. Dentro de la carpeta _public_ sólo irán archivos de la página front end.

### Notas de ayuda
1. _npm install_ ejecutará el archivo package.json y descargará las dependencias dentro de la carpeta _node_modules_

### Enlace a tablero kanban con tareas asignadas

[Tablero kanban](http://yuk0781.000webhostapp.com/kanboard)

 
