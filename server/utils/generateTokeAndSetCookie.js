import jwt from 'jsonwebtoken';

export default function generateTokenAndSetCookie(userId, res) {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
    });

    res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res;
}
