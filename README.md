
### Form Builder Backend

1. **Install dependencies:**
    ```bash
    npm i
    ```

2. **Create a `.env` file:**
   
    ```bash
    touch .env
    ```

3. **Add the following fields to the `.env` file:**
   
    ```plaintext
    MONGO_URI=<your_mongo_uri_here>
    JWT_SECRET=<your_jwt_secret_here>
    ```

    Replace `<your_mongo_uri_here>` with your MongoDB connection string and `<your_jwt_secret_here>` with a secret key for JWT.

4. **Start the backend server:**
   
    ```bash
    npm start
    ```