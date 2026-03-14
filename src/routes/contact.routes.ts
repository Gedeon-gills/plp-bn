import { Router } from "express";
import { sendContactMessage } from "../controllers/contact.controllers";

const router = Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send a contact message
 *     description: Allows a user to send a contact message to the admin.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               subject:
 *                 type: string
 *                 example: Partnership
 *               message:
 *                 type: string
 *                 example: I want to join your project.
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/", sendContactMessage);

export default router;