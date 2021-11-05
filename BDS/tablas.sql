/***********************       CATALOGOS     *************************/
CREATE TABLE IF NOT EXISTS proveedores(
    proveedor_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    clave VARCHAR(50),
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS cursos(
    curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    clave VARCHAR(50),
    imagen VARCHAR(430) NOT NULL
);


CREATE TABLE IF NOT EXISTS inscritos(
    inscrito_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    apellidos VARCHAR(50),
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE
);


/*******************  DEFINICIÓN DE INDICES EN CATÁLOGOS ***********************/

ALTER TABLE proveedores ADD INDEX(clave);
ALTER TABLE proveedores ADD INDEX(nombre);

ALTER TABLE cursos ADD INDEX(Nombre);
ALTER TABLE cursos ADD INDEX(clave);

ALTER TABLE inscritos ADD INDEX(nombre);
ALTER TABLE inscritos ADD INDEX(apellidos);


/***********************       TABLAS DE REALCION    *************************/

CREATE TABLE IF NOT EXISTS cursos_x_proveedor(
    id_cursos_x_proveedor INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT(11) NOT NULL,
    curso_id INT(11) NOT NULL,
    fecha_oferta DATE,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores (proveedor_id),
    FOREIGN KEY (curso_id) REFERENCES cursos (curso_id)
    
);


CREATE TABLE IF NOT EXISTS detalle_inscritos_x_curso(
    detalle_inscritos_x_curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    inscrito_id INT(11) NOT NULL,
    curso_id INT(11) NOT NULL,
    fecha_inscripcion DATE,
    FOREIGN KEY (inscrito_id) REFERENCES inscritos (inscrito_id),
    FOREIGN KEY (curso_id) REFERENCES cursos (curso_id)
);




