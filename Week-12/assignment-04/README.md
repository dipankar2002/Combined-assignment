### **Assignment: Build a Simple Social Media Feed**

#### **Objective**
- Design a PostgreSQL schema for a social media platform featuring users, posts, and likes.
- Implement functions to:
  - Register and retrieve users.
  - Create posts and like existing posts.
  - Retrieve a combined feed with post details and like counts.

---

#### **Instructions**

1. **Schema Design**
   - **users** table
     - `id`: Primary Key, auto-incremented integer.
     - `username`: Unique string, required.
     - `password`: String, required.
     - `name`: String, required.
   - **posts** table
     - `id`: Primary Key, auto-incremented integer.
     - `user_id`: Foreign Key referencing `users(id)`, handles `ON DELETE CASCADE`.
     - `content`: Text, required.
     - `created_at`: Timestamp, default current time.
   - **likes** table
     - `id`: Primary Key, auto-incremented integer.
     - `user_id`: Foreign Key referencing `users(id)`, handles `ON DELETE CASCADE`.
     - `post_id`: Foreign Key referencing `posts(id)`, handles `ON DELETE CASCADE`.
     - **Constraint**: `UNIQUE(user_id, post_id)` to prevent a user from liking the same post multiple times.

2. **Functions to Implement**
   - `createUser(username, password, name)`: Inserts a new user and returns the created object.
   - `getUser(id)`: Retrieves a specific user by their ID.
   - `createPost(userId, content)`: Inserts a new post and returns the created object.
   - `likePost(userId, postId)`: Inserts a like entry. Uses `ON CONFLICT DO NOTHING` to handle duplicate like attempts gracefully.
   - `getFeed()`: Retrieves all posts with author `username` and an integer `like_count`, ordered by `created_at` descending.

3. **Testing**
   - Write a script to:
     - Create the tables (`createTables`).
     - Drop the tables (`dropTables`).
     - Insert sample data into the tables.
     - Run the implemented functions.

4. **Example Data**
   - **Insert users:**
     ```sql
     INSERT INTO users (username, password, name)
     VALUES ('alice_dev', 'pass123', 'Alice'), ('bob_coder', 'pass456', 'Bob');
     ```

   - **Expected results for `getFeed()`:**
     ```json
     [
       {
         "id": 1,
         "content": "Hello World! My first post.",
         "created_at": "2026-04-23T...",
         "username": "alice_dev",
         "like_count": 2
       }
     ]
     ```

---

## **Pre-requisites**
Before you start, please grab a Postgres URL from either of the following - 
 - [https://neon.tech/](https://neon.tech/)
 - [https://aiven.io/](https://aiven.io/)

and put it in `config.ts`

## **Assignment**
You are supposed to write the `database` part of a full stack app. 
Specifically, you need to fill the functions in 
 - `src/db/user.ts`
 - `src/db/post.ts`
 - `src/db/setup.ts`

## **Testing**
Run `npm run test` to run all the tests

