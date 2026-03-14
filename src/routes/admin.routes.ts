// src/routes/admin.routes.ts
import { Router } from "express";
import { getSubscribers, createManager, getManagers } from "../controllers/admin.controllers";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();


/**
 * @swagger
 * /admin/create-manager:
 *   post:
 *     summary: Create a new manager
 *     description: Only admin users can create a manager account.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Manager
 *               email:
 *                 type: string
 *                 example: manager@email.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: Manager created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: Manager
 *       400:
 *         description: Missing fields or email already exists
 *       401:
 *         description: Unauthorized
 */
router.post("/create-manager", protect, restrictTo("admin"), createManager);

/**
 * @swagger
 * /admin/getManagers:
 *   get:
 *     summary: Get all managers
 *     description: Admin can view all managers.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of managers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 managers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Manager
 *                       email:
 *                         type: string
 *                         example: manager@email.com
 *                       createdAt:
 *                         type: string
 *                         example: 2026-03-14T10:00:00.000Z
 *       401:
 *         description: Unauthorized
 */
router.get("/getManagers", protect, restrictTo("admin"), getManagers);

/**
 * @swagger
 * /admin/subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Allows Admin or Manager to view all newsletter subscribers
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscribers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: user@email.com
 *                       createdAt:
 *                         type: string
 *                         example: 2026-03-14T12:00:00.000Z
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/subscribers",
  protect,
  restrictTo("admin", "Manager"), // both roles can access
  getSubscribers
);

export default router;