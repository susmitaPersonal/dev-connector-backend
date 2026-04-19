/**
 * @swagger
 * components:
 *   schemas:
 *     ConnectionRequest:
 *       type: object
 *       required:
 *         - fromUserId
 *         - toUserId
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *         fromUserId:
 *           type: string
 *           description: User ID who sends request
 *           example: "64f1c2a12b3c4d5e6f789012"
 *         toUserId:
 *           type: string
 *           description: User ID who receives request
 *         status:
 *           type: string
 *           enum: [ignored, interested, accepted, rejected]
 *           example: "interested"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConnectionActionResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/ConnectionRequestResponse'
 *         message:
 *           type: string
 */