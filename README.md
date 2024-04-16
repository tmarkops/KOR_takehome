Starting the backend:

1. make sure Docker daemon is running
2. ```bash
      npm i
   ```
3. start the server:
   ```bash
      npm run start-dev
   ```
4. start another terminal session for the next steps
5. give executable permission to the script file:
    ```bash
      chmod +x ./scripts/get_db_url.sh 
    ```
6.
 ```bash
 npm run migrate up
 ```


Starting the frontend:

1.
```bash
  npm i
```
2.
```bash
  npm run start
```

