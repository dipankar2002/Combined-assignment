import { client } from '../index';

export async function createUser(username: string, password: string, name: string) {
  const res = await client.query(
    `INSERT INTO users (username, password, name)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [username, password, name]
  );
  return res.rows[0];
}

export async function getUser(id: number) {
  const res = await client.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return res.rows[0];
}