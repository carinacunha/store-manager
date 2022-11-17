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
      INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
      WHERE s.id = ?
      ORDER BY s.id ASC, p.product_id ASC`,
      [id],
  );
  return result;
};

const update = async (id, sales) => {
  await sales.map(({ productId, quantity }) => (
    connection.execute(
      `UPDATE StoreManager.sales_products
      SET quantity = ? WHERE sale_id = ? AND product_id = ?`,
      [quantity, id, productId],
    )));
  const result = {
    saleId: id,
    itemsUpdated: sales,
  };
  
  return result;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

module.exports = {
  insert,
  checkIds,
  findAll,
  findById,
  deleteById,
  update,
};