### **Assignment: Build a Project & Task Manager**

#### **Objective**
- Design a PostgreSQL schema for managing projects and tasks.
- Implement functions to:
  - Create and retrieve users.
  - Create and list projects for a user.
  - Create, update, and retrieve tasks for a project.

---

#### **Instructions**

1. **Schema Design** - **users** table
     - `id`: Primary Key, auto-incremented integer.
     - `username`: Unique string, required.
     - `password`: String, required.
     - `name`: String, required.
   - **projects** table
     - `id`: Primary Key, auto-incremented integer.
     - `user_id`: Foreign Key referencing `users(id)`, required.
     - `title`: String, required.
     - `description`: String, optional.
     - `created_at`: Timestamp, default current time.
   - **tasks** table
     - `id`: Primary Key, auto-incremented integer.
     - `project_id`: Foreign Key referencing `projects(id)`, required.
     - `title`: String, required.
     - `completed`: Boolean, default `false`.
     - `due_date`: Date, optional.

2. **Functions to Implement** - `createUser(username, password, name)`: Inserts a new user and returns the created object.
   - `createProject(userId, title, description)`: Inserts a new project for a user.
   - `getProjects(userId)`: Retrieves all projects for a specific user, ordered by most recent.
   - `createTask(projectId, title, dueDate)`: Inserts a new task for a project.
   - `updateTask(taskId, completed)`: Updates a task's completion status.
   - `getTasks(projectId)`: Retrieves all tasks for a specific project.

3. **Testing** - Write a script to:
     - Create the tables.
     - Drop the tables.
     - Insert sample data into the tables.
     - Run the implemented functions.

4. **Example Data**

   - Insert users:
     ```sql
     INSERT INTO users (username, password, name)
     VALUES 
       ('sumana_das', 'pass123', 'Sumana Das'),
       ('dev_user', 'devpass', 'Developer User');
     ```

   - Expected results for function calls:
     - `createProject(1, 'Portfolio Website', 'Building my personal site')`  
       - Inserts and returns:
         ```json
         {
           "id": 1,
           "user_id": 1,
           "title": "Portfolio Website",
           "description": "Building my personal site",
           "created_at": "2026-04-23T..."
         }
         ```
     - `updateTask(1, true)`  
       - Updates and returns:
         ```json
         {
           "id": 1,
           "project_id": 1,
           "title": "Setup Database",
           "completed": true,
           "due_date": "2026-05-01"
         }
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
 - `src/db/project.ts`
 - `src/db/task.ts`
 - `src/db/setup.ts`

## **Testing**
Run `npm run test` to run all the tests