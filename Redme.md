# MERN Authentication Project

This project is a basic authentication system built with Node.js, Express, MongoDB, and Mailtrap for email verification in development.

## Getting Started

Follow these steps to set up and run the project locally.

### Step 1: Initialize a New Node.js Project

```bash
npm init -y
```
This command initializes a new Node.js project with default settings, generating a `package.json` file that will keep track of dependencies and scripts for your project.

### Step 2: Install Required Packages

```bash
npm install express cookie-parser mailtrap bcryptjs dotenv jsonwebtoken mongoose crypto
```

This command installs the necessary dependencies:

- **express**: Framework for building the server.
- **cookie-parser**: Middleware to handle cookies in requests.
- **mailtrap**: Service to simulate email sending in development.
- **bcryptjs**: Library to hash passwords.
- **dotenv**: For managing environment variables from a `.env` file.
- **jsonwebtoken**: For creating and verifying JWT tokens.
- **mongoose**: For interacting with MongoDB.
- **crypto**: To generate secure random values, often used for token generation.

### Step 3: Install nodemon for Automatic Server Restarts

```bash
npm i nodemon -D
```

`nodemon` is a development dependency (`-D`) that automatically restarts the server when file changes are detected, making development easier.

### Step 4: Update package.json to Support ES Modules

In `package.json`, add:

```json
"type": "module"
```

This enables ES module support, allowing you to use `import` and `export` syntax instead of `require`.

### Step 5: Set the Entry Point for Your Application

In `package.json`, set the `main` field:

```json
"main": "backend/index.js"
```

This line defines the entry point for your application. In this case, the application will start from `backend/index.js`.

### Step 6: Add a Development Script

In the `scripts` section of `package.json`, add:

```json
"dev": "nodemon backend/index.js"
```

This command runs the server using `nodemon`, so the server restarts automatically whenever you make changes.

### Environment Variables

Create a `.env` file in the root directory and add the following variables to store sensitive information:

```bash
DB_USERNAME=devnickverma
DB_PASSWORD=dz1YIK5JH6uHIKdS
DB_URL=mongodb+srv://devnickverma:dz1YIK5JH6uHIKdS@cluster0.ht2wm.mongodb.net/
JWT_SECRET=your_jwt_secret_key
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

> **Note**: Replace `your_jwt_secret_key`, `your_mailtrap_username`, and `your_mailtrap_password` with actual values.

## Running the Project

- **Start the Server**:

  ```bash
  npm run dev
  ```

  This command runs the server in development mode using `nodemon`. Any code changes will automatically restart the server.

- **Run Mailtrap Configuration**:

  ```bash
  node backend/mailtrap/mailtrap.config.js
  ```

  This command runs the Mailtrap configuration file to simulate email sending in development.

## Testing Authentication Endpoints

### 1. Sign Up Endpoint
- **URL**: `http://localhost:5000/api/auth/signup`
- **Method**: `POST`
- **Body (JSON)**:
  ```json
  {
      "email": "maliy45425@evasud.com",
      "name": "tester1",
      "password": "12345"
  }
  ```
- **Description**: Creates a new user with the provided email, name, and password. After successful signup, a verification code is sent to the email address.

### 2. Verify Email Endpoint
- **URL**: `http://localhost:5000/api/auth/verify-email`
- **Method**: `POST`
- **Body (JSON)**:
  ```json
  {
      "code": "98324"
  }
  ```
- **Description**: Verifies the user's email with the provided code. If the code is correct, the account is activated.