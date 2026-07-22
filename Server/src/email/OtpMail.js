export const sendotp = ( otp ) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
        <p style="font-size: 16px; color: #555;">Use the following OTP to complete your action. This OTP is valid for a limited time.</p>
        <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #007BFF; padding: 10px 20px; border: 1px solid #007BFF; border-radius: 5px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #999;">If you did not request this OTP, please ignore this email.</p>
        <p style="font-size: 14px; color: #999;">Thank you for using our service!</p>
    </div>
    `;
}

export const sendResetOtp = ( otp ) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset OTP</h2>
        <p style="font-size: 16px; color: #555;">Use the following OTP to reset your password. This OTP is valid for a limited time.</p>
        <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #007BFF; padding: 10px 20px; border: 1px solid #007BFF; border-radius: 5px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #999;">If you did not request a password reset, please ignore this email.</p>
        <p style="font-size: 14px; color: #999;">Thank you for using our service!</p>
    </div>
    `;
}