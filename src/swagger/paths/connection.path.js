/**
 * @swagger
 * tags:
 *   name: Connection
 *   description: Connection request APIs
 */

/**
 * @swagger
 * /request/send/{status}/{toUserId}:
 *   post:
 *     summary: Send connection request (interested / ignored)
 *     tags: [Connection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [interested, ignored]
 *         description: Status of connection request
 *       - in: path
 *         name: toUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: Target user ID
 *     responses:
 *       200:
 *         description: Request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConnectionActionResponse'
 *       400:
 *         description: Invalid status or connection already exists
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /request/review/{status}/{requestId}:
 *   post:
 *     summary: Review connection request (accept / reject)
 *     tags: [Connection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [accepted, rejected]
 *         description: Action to perform
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Connection request ID
 *     responses:
 *       200:
 *         description: Connection request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConnectionActionResponse'
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */