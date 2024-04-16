To start backend:

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



While developing:

To create a migration:
```bash
    npm run migrate create [migrationname]
 ```

To generate Kysely types based on current db schema
```bash
   nom run gen
```