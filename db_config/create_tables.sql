DROP TABLE IF EXISTS order_complete;
DROP TABLE IF EXISTS user_alias;
DROP TABLE IF EXISTS product_price;
DROP TABLE IF EXISTS product_picture;
DROP TABLE IF EXISTS product_stock;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
  email VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE user_alias(
  fk_email VARCHAR(128) NOT NULL,
  alias VARCHAR(128),
  FOREIGN KEY (fk_email) REFERENCES  user (email)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (fk_email)
);

CREATE TABLE product(
  product VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (product)
);

CREATE TABLE product_price(
  fk_product VARCHAR(128) NOT NULL,
  price DECIMAL(11, 2),
  FOREIGN KEY(fk_product) REFERENCES product (product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);

CREATE TABLE product_picture(
  fk_product VARCHAR(128) NOT NULL,
  path_to_picture VARCHAR(128),
  FOREIGN KEY(fk_product) REFERENCES product(product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);

CREATE TABLE product_stock(
  fk_product VARCHAR(128) NOT NULL,
  stock INT(11),
  FOREIGN KEY(fk_product) REFERENCES product (product)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(fk_product)
);

CREATE TABLE `order`(
  order_num INT(11) NOT NULL AUTO_INCREMENT,
  fk_product VARCHAR(128) NOT NULL,
  fk_email VARCHAR(128) NOT NULL,
  quantity INT(11),
  FOREIGN KEY (fk_product) REFERENCES product (product),
  FOREIGN KEY (fk_email) REFERENCES user (email),
  PRIMARY KEY (order_num)
);

CREATE TABLE order_complete(
  fk_order_num INT(11) NOT NULL,
  status VARCHAR(128) NOT NULL,
  FOREIGN KEY(fk_order_num) REFERENCES `order` (order_num)
  ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (fk_order_num)
);
