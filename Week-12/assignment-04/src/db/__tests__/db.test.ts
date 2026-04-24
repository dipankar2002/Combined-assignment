import { client } from '../..';
import { createUser } from '../user';
import { createTables, dropTables } from '../setup';
import { createPost, likePost, getFeed } from '../post';

beforeAll(async () => {
  await client.connect();
  await dropTables();
  await createTables();
});

afterAll(async () => {
  await client.end();
});

describe('Social Feed System', () => {
  let userId: number;
  let postId: number;

  test('createUser works', async () => {
    const user = await createUser('pixy', 'pass', 'Pixy');
    userId = user.id;

    expect(user.username).toBe('pixy');
  });

  test('createPost works', async () => {
    const post = await createPost(userId, 'Hello world');
    postId = post.id;

    expect(post.content).toBe('Hello world');
    expect(post.user_id).toBe(userId);
  });

  test('likePost works', async () => {
    await likePost(userId, postId);

    const res = await client.query(
      `SELECT COUNT(*) FROM likes WHERE post_id = $1`,
      [postId]
    );

    expect(Number(res.rows[0].count)).toBe(1);
  });

  test('getFeed returns correct data', async () => {
    const feed = await getFeed();

    expect(feed.length).toBeGreaterThan(0);

    const post = feed[0];
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('username');
    expect(post).toHaveProperty('like_count');
    expect(Number(post.like_count)).toBe(1);
  });
});