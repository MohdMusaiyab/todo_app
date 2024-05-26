# To-Do Application

This is a To-Do application that allows users to manage their tasks efficiently. Users can create, update, delete, and view their tasks.


## Features

- User authentication
- Create, read, update, and delete tasks
- View tasks by status (Pending, In Progress, Completed)
- Due date formatting

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Axios
- Tailwind CSS
- Redux
- date-fns
- js-cookie

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)
- MongoDB (v4 or later)
  
## Getting Started

### 1. Clone the repository
```bash
  git clone https://github.com/MohdMusaiyab/todo_app/
  cd todo_app
```
### 2. Install dependencies
To install the required dependencies for both the server and client components, follow these steps:
```bash
cd server
npm install
cd ..
cd client
npm i
```
### 3. Set up environment variables
Create a `.env` file in the `server` directory and add the following environment variables based on the `.sample.env` file:

```bash
# Inside server/.env
MONGO_URI="mongodb://localhost:27017/mydatabase"
JWT_SECRET="your_secret_key_here"
```
### 4. Run the application

#### Server
Navigate to the `server` directory and start the server:
```bash
cd server
npm run dev
```
Now open another terminal and navigate to `client` directory and start the client side there
```bash
cd client
npm run dev
