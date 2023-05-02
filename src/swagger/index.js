/**
 * @swagger
 * /api/user/login:
 *  post:
 *      description: response
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: Login
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/user/signup:
 *  post:
 *      description: response
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: Login
 *        schema:
 *          type: object
 *          properties:
 *              full_name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *          200:
 *              description: success
 */