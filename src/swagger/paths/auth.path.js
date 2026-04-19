/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User added successfully
 *       422:
 *         description: Validation error (Zod validation failed)
 *       400:
 *         description: Error saving user
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         headers:
 *           Set-Cookie:
 *             description: JWT token stored in cookie
 *             schema:
 *               type: string
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Failed to sign in user
 */

/**
 * @swagger
 * /signout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successfully
 *       500:
 *         description: Something went wrong
 */