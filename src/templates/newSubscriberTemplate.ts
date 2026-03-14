export const newSubscriberTemplate = (email: string) => {
  return `
  <div style="font-family: Arial, sans-serif; padding:20px;">
    <h2 style="color:#28a745;">New Newsletter Subscriber 🎉</h2>

    <p>A new user has subscribed to your newsletter.</p>

    <div style="
      background:#f4f4f4;
      padding:15px;
      border-radius:6px;
      font-size:16px;
      font-weight:bold;
    ">
      ${email}
    </div>
  </div>
  `;
};