import { client } from '../index';

export async function createTask(projectId: number, title: string, dueDate: string) {
  const res = await client.query(
    `INSERT INTO tasks (project_id, title, due_date)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [projectId, title, dueDate]
  );
  return res.rows[0];
}

export async function updateTask(taskId: number, completed: boolean) {
  const res = await client.query(
    `UPDATE tasks
     SET completed = $2
     WHERE id = $1
     RETURNING *`,
    [taskId, completed]
  );
  return res.rows[0];
}

export async function getTasks(projectId: number) {
  const res = await client.query(
    `SELECT * FROM tasks WHERE project_id = $1`,
    [projectId]
  );
  return res.rows;
}