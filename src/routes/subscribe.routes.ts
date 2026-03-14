import { Router } from "express";
import { subscribeUser } from "../controllers/subscribe.controllers";

const router = Router();

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     description: Allows a user to subscribe to the newsletter to receive updates and announcements.
 *     tags:
 *       - Subscribe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Subscription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: You have been subscribed successfully!
 *       400:
 *         description: Invalid request / Email already subscribed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid email or already subscribed
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/", subscribeUser);

export default router;