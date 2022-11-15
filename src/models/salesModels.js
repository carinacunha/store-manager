const connection = require('./connection');

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES()',
  );
 
  const values = sale.map(
    ({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`,
  );

  const valuesString = values.join(', ');

  connection.execute(
    `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES ${valuesString}`,
  );
  return insertId;
};

 const checkIds = async (ids) => {
  const [results] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE id IN (${ids.join(', ')})`,
  );
  return results;
 };

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId, s.date, p.product_id AS productId, p.quantity 
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products as p ON s.id = p.sale_id;`,
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity 
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products as p ON s.id = p.sale_id
      WHERE s.id = ?
      ORDER BY s.id ASC, p.product_id ASC`,
    
      [id],
  );
  return result;
};

module.exports = {
  insert,
  checkIds,
  findAll,
  findById,
};