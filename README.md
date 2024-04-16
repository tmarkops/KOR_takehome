Starting the backend:

1. make sure Docker daemon is running
2. ```bash
   cd backend
   ```
3. ```bash
      npm i
   ```
4. start the server:
   ```bash
      npm run start-dev
   ```
5. start another terminal session for the next steps
6. give executable permission to the script file:
    ```bash
      chmod +x ./scripts/get_db_url.sh 
    ```
7. 
 ```bash
 npm run migrate up
 ```


Starting the frontend:

1. ```bash
   cd frontend
   ```
2. 
```bash
  npm i
```
2.
```bash
  npm run start
```

