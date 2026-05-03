/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related APIs
 */

/**
 * @swagger
 * /user/connections:
 *   get:
 *     summary: Get all connection requests (sent + received)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ConnectionRequestResponse'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/requests/recieved:
 *   get:
 *     summary: Get received connection requests
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ConnectionRequestResponse'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/feed:
 *   get:
 *     summary: Get user feed (excluding connected users)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: User feed fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SafeUser'
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to fetch feed
 */