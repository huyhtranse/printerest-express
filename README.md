# Printerest Express

This is a Node.js project that uses Express to create a web application. 
https://www.figma.com/file/dpyHJIJI8KRcLngmLDDibm/Capstone-express-ORM-(pinterest)?node-id=3%3A38
Or bt-printerest.docx

## Installation
To run this project on your local machine, follow these steps:
1.  Clone the repository
2.  Install the dependencies using `npm install`
3.  Run the server using `npm start`

## API
### Endpoint
The following endpoints are available in the API:
-   `GET /api/user/signup`: Signs up
-   `GET /api/user/login`: Logs in
- 
-   `GET /api/image/get-images`: Gets all images without authentication.
-   `GET /api/image/search-images`: Gets images by a keywork without authentication.
-   
-   `GET /api/image/image-details/:id`: Gets image details and owner based on the provided image ID without authentication.
-   `GET /api/image/image-comments/:id`: Gets all comments of an image based on the provided image ID without authentication.
-   `GET /api/image/image-save/:id`: Gets the status describing whether the image was saved based on the provided image ID.
-   `POST /api/image/comment-image/:id`: Posts a comment into an image post based on the provided image ID.
- 
-   `GET /api/image/get-user`: Gets an user information.
-   `GET /api/image/get-images-save/:id`: Gets saved images based on the provided image ID.
-   `GET /api/image/get-images-create/:id`: Gets created images based on the provided image ID.
-   `DELETE /api/image/delete-image/:id`: Deletes a post created based on the provided image ID.
- 
-   `POST /api/image/upload-image`: Uploads an image into server
-   `POST /api/image/create-image`: Posts the image into database.
- 
-   `PUT /api/user/change-info`: Updates the image into database.