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
    * lib
     * _bootstrap.css_
    * style.css
  * module1  
  * module2  
  * ...
* index.html  
* app.module.js  
* app.config.js

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

### Notas de ayuda
1. ...

### Enlace a tablero kanban con tareas asignadas

[Tablero kanban](http://yuk0781.000webhostapp.com/kanboard)

 
