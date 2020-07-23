# REST_API_PROJECT :fire: Shop :fire:

  * **BaseURL**
  ```
  http://localhost:3000
  ```

# USER
  1. **Create Account (sing-up)**
      * **URL**
        <p>/signup</p>
      * **Methods** ```POST```
      
      * **URL Params**
        <p>None</p>
      * **Data Params**
        <p>None</p>
      * **Success Response**
           * **Code**    ```200```
           * **Content** ```{token: "judF64f5s4df48rs6d4fd..."}```
      * **Error Response**
           * **Code**  ```400```
           * **Content** ```{error: "invalid email, try again"}```
      * **Sample Call**
      ```
      {
        "username": "userA"
        "email": "user@example.com"
        "password" : "sldkds5454"
      }
      ```
  2. **Login**
      * **URL**
        <p>/login</p>
      * **Methods** ```POST```
      
      * **URL Params**
        <p>None</p>
        
      * **Success Response**
           * **Code**    ```200```
           * **Content** ```{token: "judF64f5s4df48rs6d4fd..."}```
      * **Error Response**
           * **Code**  ```400```
           * **Content** ```{error: "incorrect password or email, try again"}```
      * **Sample Call**
      ```
      {
        "email": "user@example.com"
        "password" : "sldkds5454"
      }
      ```

  3. **Delete Account**
      * **URL**
        <p>/</p>
      * **Methods** ```DELETE```
      
      * **URL Params**
        ```userID=[integer]```
      * **Data Params**
        <p>None</p>
      * **Success Response**
           * **Code**    ```200```
           * **Content** ```{message: "account deleted successfully"}```
      * **Error Response**
           * **Code**  ```400```
           * **Content** ```{error: "no user exist with this ID"}```
      * **Sample Call**
      ```
      DELETE | http://localhost:3000/:as6s5d6sds4ds4a654d8ss
      ```
    
    
  
- ORDER  
  - POST new order
  - GET all orders
  - GET one order by id
  - PUT one order by id
  - DELETE order by id
- PRODUCT
  - POST new product
  - GET all products
  - GET One Product by ID
  - PUT Product by ID
  - DELETE Product by ID
