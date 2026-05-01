/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - emailId
 *         - phoneNumber
 *         - password
 *         - age
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f1c2a12b3c4d5e6f789012"
 *         firstName:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Susmita"
 *         lastName:
 *           type: string
 *           example: "Biswas"
 *         emailId:
 *           type: string
 *           format: email
 *           example: "susmita@gmail.com"
 *         phoneNumber:
 *           type: string
 *           example: "9876543210"
 *         password:
 *           type: string
 *           format: password
 *           example: "Strong@123"
 *         age:
 *           type: number
 *           minimum: 13
 *           maximum: 100
 *           example: 25
 *         gender:
 *           type: string
 *           enum: [Male, Female, Others]
 *           example: "Female"
 *         about:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["React", "Node.js"]
 *         photoUrl:
 *           type: string
 *           format: uri
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
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - emailId
 *         - phoneNumber
 *         - password
 *         - age
 *       properties:
 *         firstName:
 *           type: string
 *           example: "Susmita"
 *         lastName:
 *           type: string
 *           example: "Biswas"
 *         emailId:
 *           type: string
 *           format: email
 *           example: "susmita@gmail.com"
 *         phoneNumber:
 *           type: string
 *           example: "9876543210"
 *         password:
 *           type: string
 *           format: password
 *           example: "Strong@123"
 *         age:
 *           type: number
 *           example: 25
 *         gender:
 *           type: string
 *           enum: [Male, Female, Others]
 *           example: "Female"
 *         about:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["React", "Node.js"]
 *         photoUrl:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInRequest:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           format: email
 *           example: "susmita@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "Strong@123"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       description: Fields that can be updated by user
 *       properties:
 *         firstName:
 *           type: string
 *           example: "Susmita"
 *         lastName:
 *           type: string
 *         age:
 *           type: number
 *           example: 26
 *         gender:
 *           type: string
 *           enum: [Male, Female, Others]
 *         about:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         photoUrl:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "Success"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SafeUser:
 *       type: object
 *       description: Public user fields (safe attributes)
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         photoUrl:
 *           type: string
 *         age:
 *           type: number
 *         gender:
 *           type: string
 *         about:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConnectionRequestResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fromUserId:
 *           $ref: '#/components/schemas/SafeUser'
 *         toUserId:
 *           $ref: '#/components/schemas/SafeUser'
 *         status:
 *           type: string
 *           enum: [ignored, interested, accepted, rejected]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SafeUser'
 *         message:
 *           type: string
 */