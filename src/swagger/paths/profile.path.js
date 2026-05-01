/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile APIs
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /profile/delete:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Profile]
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */

/**
 * @swagger
 * /profile/edit:
 *   patch:
 *     summary: Update logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       201:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       422:
 *         description: Validation error
 *       500:
 *         description: Failed to update user
 */