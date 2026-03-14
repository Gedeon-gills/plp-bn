export const resetPasswordTemplate = (resetURL: string) => {
  return `
  <div style="font-family: Arial; padding:20px">
    <h2>Password Reset Request</h2>

    <p>You requested to reset your password.</p>

    <p>Click the button below to reset your password:</p>

    <a href="${resetURL}"
       style="
       display:inline-block;
       padding:12px 20px;
       background:#2563eb;
       color:white;
       text-decoration:none;
       border-radius:6px;
       font-weight:bold;">
       Reset Password
    </a>

    <p style="margin-top:20px">
      This link will expire in 10 minutes.
    </p>

    <p>If you did not request this, please ignore this email.</p>
  </div>
  `;
};