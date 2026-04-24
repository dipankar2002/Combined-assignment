import { client } from '../..';
import { createUser, getUser } from '../user';
import { createTables, dropTables } from '../setup';
import { createProject, getProjects } from '../project';
import { createTask, updateTask, getTasks } from '../task';

beforeAll(async () => {
    await client.connect();
    await dropTables();
    await createTables();
});

afterAll(async () => {
    await client.end();
});

describe('User Database Operations', () => {
    test('createUser inserts a new user', async () => {
        const user = await createUser('pixy', 'pass123', 'Pixy');

        expect(user).toHaveProperty('id');
        expect(user.username).toBe('pixy');
        expect(user.name).toBe('Pixy');
    });

    test('getUser retrieves user by ID', async () => {
        const user = await getUser(1);

        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('username');
    });
});

describe('Project Operations', () => {
    let userId: number;

    beforeAll(async () => {
        const res = await client.query(
            'SELECT id FROM users WHERE username = $1',
            ['pixy']
        );
        userId = res.rows[0].id;
    });

    test('createProject inserts a project', async () => {
        const project = await createProject(
            userId,
            'Build App',
            'Cool backend project'
        );

        expect(project).toHaveProperty('id');
        expect(project.title).toBe('Build App');
        expect(project.user_id).toBe(userId);
    });

    test('getProjects retrieves all projects for user', async () => {
        const projects = await getProjects(userId);

        expect(projects.length).toBeGreaterThan(0);
        projects.forEach(p => {
            expect(p.user_id).toBe(userId);
        });
    });
});

describe('Task Operations', () => {
    let projectId: number;

    beforeAll(async () => {
        const res = await client.query(
            'SELECT id FROM projects LIMIT 1'
        );
        projectId = res.rows[0].id;
    });

    test('createTask inserts a task', async () => {
        const task = await createTask(
            projectId,
            'Write SQL',
            '2024-12-01'
        );

        expect(task).toHaveProperty('id');
        expect(task.title).toBe('Write SQL');
        expect(task.completed).toBe(false);
    });

    test('updateTask marks task as completed', async () => {
        const { id } = await createTask(
            projectId,
            'Another Task',
            '2024-12-05'
        );

        const updated = await updateTask(id, true);

        expect(updated.completed).toBe(true);
    });

    test('getTasks retrieves all tasks for project', async () => {
        const tasks = await getTasks(projectId);

        expect(tasks.length).toBeGreaterThan(0);
        tasks.forEach(t => {
            expect(t.project_id).toBe(projectId);
        });
    });
});