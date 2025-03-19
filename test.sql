-- Seleccionar la base de datos
USE test;

-- Eliminar tablas si existen
DROP TABLE IF EXISTS protagonistas;
DROP TABLE IF EXISTS heroes;
DROP TABLE IF EXISTS peliculas;

-- Crear la tabla heroes
CREATE TABLE heroes (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    bio TEXT NOT NULL,
    img VARCHAR(250) NOT NULL,
    aparicion DATE NOT NULL,
    casa VARCHAR(20)
);

-- Añadir restricción de unicidad para el nombre de los héroes
ALTER TABLE heroes
    ADD CONSTRAINT heroes_nombre_u UNIQUE (nombre);

-- Insertar datos en la tabla heroes
INSERT INTO heroes (nombre, bio, img, aparicion, casa) VALUES
('Pedro Picapiedra', 'Pedro Picapiedra es el personaje principal de la serie de televisión "Los Picapiedra". Vive en la ciudad prehistórica de Piedradura y trabaja en la cantera de la empresa "Pedregal y Pedregal".', 'ruta/a/imagen/pedro.jpg', '1960-09-30', 'Piedradura'),
('Vilma Picapiedra', 'Vilma es la esposa de Pedro Picapiedra. Es una mujer cariñosa y madre de Pebbles. Se caracteriza por su inteligencia y buen juicio.', 'ruta/a/imagen/vilma.jpg', '1960-09-30', 'Piedradura'),
('Betty Marmol', 'Betty Rubble es la esposa de Pablo Marmol y amiga de Vilma. Es amable y siempre está dispuesta a ayudar a los demás. Junto con su esposo, vive al lado de los Picapiedra.', 'ruta/a/imagen/betty.jpg', '1960-09-30', 'Piedradura'),
('Pablo Marmol', 'Barney Rubble es el mejor amigo de Pedro Picapiedra y el esposo de Betty. Es el compañero de aventuras de Pedro, y aunque suele ser un poco tonto, siempre está dispuesto a ayudar a sus amigos.', 'ruta/a/imagen/barney.jpg', '1960-09-30', 'Piedradura');

-- Crear la tabla peliculas
CREATE TABLE peliculas (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL
);

-- Insertar datos en la tabla peliculas
INSERT INTO peliculas (nombre) VALUES
('Los Picapiedra (1994)'),
('Los Picapiedra: Viva Rock Vegas (2000)'),
('Los Picapiedra: La película animada (2000)'),
('Los Picapiedra y la piedra filosofal (2014)');

-- Crear la tabla protagonistas con campos adicionales
CREATE TABLE protagonistas (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idheroe BIGINT NOT NULL,
    idpelicula BIGINT NOT NULL,
    rol VARCHAR(50) NOT NULL, -- Rol del protagonista en la película
    descripcion TEXT, -- Descripción del personaje en la película
    orden_aparicion INT, -- Orden de aparición en los créditos
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    CONSTRAINT prog_heroes_fk FOREIGN KEY (idheroe) REFERENCES heroes(id),
    CONSTRAINT prog_peliculas_fk FOREIGN KEY (idpelicula) REFERENCES peliculas(id)
);

-- Insertar datos en la tabla protagonistas con los nuevos campos
INSERT INTO protagonistas (idpelicula, idheroe, rol, descripcion, orden_aparicion) VALUES
(
    (SELECT id FROM peliculas WHERE nombre = 'Los Picapiedra (1994)'),
    (SELECT id FROM heroes WHERE nombre = 'Pedro Picapiedra'),
    'Protagonista',
    'Pedro es el personaje principal de la película, un hombre prehistórico trabajador y divertido.',
    1
),
(
    (SELECT id FROM peliculas WHERE nombre = 'Los Picapiedra (1994)'),
    (SELECT id FROM heroes WHERE nombre = 'Vilma Picapiedra'),
    'Protagonista',
    'Vilma es la esposa de Pedro, una mujer inteligente y cariñosa que apoya a su familia.',
    2
),
(
    (SELECT id FROM peliculas WHERE nombre = 'Los Picapiedra (1994)'),
    (SELECT id FROM heroes WHERE nombre = 'Betty Marmol'),
    'Secundario',
    'Betty es la amiga de Vilma y esposa de Pablo, siempre dispuesta a ayudar a sus amigos.',
    3
),
(
    (SELECT id FROM peliculas WHERE nombre = 'Los Picapiedra (1994)'),
    (SELECT id FROM heroes WHERE nombre = 'Pablo Marmol'),
    'Secundario',
    'Pablo es el mejor amigo de Pedro, un hombre leal y divertido que siempre está ahí para ayudar.',
    4
);

-- Consulta para verificar los datos insertados
SELECT 
    h.nombre AS heroe,
    p.nombre AS pelicula,
    pr.rol,
    pr.descripcion,
    pr.orden_aparicion,
    pr.fecha_creacion
FROM protagonistas pr
JOIN heroes h ON pr.idheroe = h.id
JOIN peliculas p ON pr.idpelicula = p.id;