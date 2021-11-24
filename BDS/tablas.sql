


CREATE TABLE IF NOT EXISTS proveedores(  
             proveedor_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
             nombre VARCHAR(200) NOT NULL,  
             clave VARCHAR(50),  
             correo VARCHAR(100) NOT NULL,  
             telefono1 VARCHAR(20) NOT NULL,  
             telefono2 VARCHAR(20) NOT NULL, 
             usuario VARCHAR(20) NOT NULL,  
             passw VARCHAR(20) NOT NULL,  
             estatus CHAR(1) NOT NULL 
             );


CREATE TABLE IF NOT EXISTS cursos(  
             curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
             proveedor_id INT(11) NOT NULL,  
             nombre VARCHAR(200) NOT NULL,  
             clave VARCHAR(50), 
             descripcion VARCHAR(450) NOT NULL, 
             tipo_musica CHAR(1) NOT NULL,  
             FOREIGN KEY(proveedor_id) REFERENCES proveedores(proveedor_id) 
             );


 CREATE TABLE IF NOT EXISTS imagenes_cursos(  
             imagenes_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
             curso_id INT(11) NOT NULL,  
             nombre_imagen VARCHAR(250) NOT NULL,  
             FOREIGN KEY(curso_id) REFERENCES cursos(curso_id) 
             );

CREATE TABLE IF NOT EXISTS inscritos(  
             inscrito_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
             nombre VARCHAR(200) NOT NULL,  
             apellidos VARCHAR(50) NOT NULL,  
             correo VARCHAR(100) NOT NULL,  
             telefono VARCHAR(20),  
              fecha_nacimiento DATE  
              );

CREATE TABLE IF NOT EXISTS detalle_inscritos_x_curso(  
              detalle_inscritos_x_curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
              inscrito_id INT(11) NOT NULL,  
              curso_id INT(11) NOT NULL,  
              fecha_inscripcion DATE,  
              FOREIGN KEY(inscrito_id) REFERENCES inscritos(inscrito_id),  
              FOREIGN KEY(curso_id) REFERENCES cursos(curso_id)  
             );




/**************  PRCEDURE  ****************/
USE baluxvwixylw17lpuboq;

DELIMITER $$ 
CREATE PROCEDURE validaUsuario_Proveedores( IN V_usuario VARCHAR(200), OUT R_usuario VARCHAR(200))
BEGIN 
    SELECT P.usuario
    INTO R_usuario
    FROM proveedores P
    WHERE P.usuario = V_usuario
    LIMIT 1;

END$$


DELIMITER $$ 
CREATE PROCEDURE validaCurso_Proveedores( IN v_nombre VARCHAR(200), IN v_proveedor_id INT(11), OUT R_nombre VARCHAR(200))
BEGIN 
    SELECT P.nombre
    INTO R_nombre
    FROM cursos P
    WHERE P.nombre = v_nombre AND P.proveedor_id = v_proveedor_id
    LIMIT 1;

END$$

DELIMITER $$ 
CREATE PROCEDURE obtener_curso(IN v_nombre VARCHAR(200),  IN v_proveedor_id INT(11),OUT R_curso_id INT(11))
BEGIN 
    SELECT P.curso_id
    INTO R_curso_id
    FROM cursos P
    WHERE P.nombre = v_nombre AND P.proveedor_id = v_proveedor_id
    LIMIT 1;

END$$








/**************  TRIGGERS  ****************/
DELIMITER $$ 
CREATE TRIGGER INSERT_USER_PROVEEDOR BEFORE INSERT ON proveedores
FOR EACH ROW BEGIN 
IF EXISTS( SELECT 1 FROM proveedores WHERE usuario= NEW.usuario) THEN 
signal SQLSTATE '45000'; -- esto lanza el error 
END IF; 
END$$ 
DELIMITER ;