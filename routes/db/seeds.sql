
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS cartitems CASCADE;


CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  datecreated TIMESTAMP NOT NULL

);

CREATE TABLE cartitems (
  id SERIAL PRIMARY KEY NOT NULL,
  cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL

);


INSERT INTO categories (name, image)
VALUES ('Hats', 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');

INSERT INTO products (category_id, title, image, price)
VALUES (1, 'hat1','https://images.unsplash.com/photo-1609593301015-7fa634e0e407?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',3.5);

INSERT INTO users (id,name, email, password)
VALUES (1, 'Rohan','rohanbatra24@gmail.com','bd0a862ebb886ce4cf33f0e9ba6b47883e61a924dedd76b92fabb828c967d3c986022e54ab59631eab63dc395b74f410cba472401b2d0f0d084850f76dfed2a5.57d6e5a6932e414e');




