import asyncHandler from "../../Utils/asyncHandler.js";
import toPublicUser from "../../Utils/toPublicUser.js";
import * as authService from './auth.service.js';


const REFRESH_COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    path: "/api/auth/refresh",
    maxAge: 30 * 24 * 60 * 60 * 1000
}

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTS);
  res.status(201).json({ user: toPublicUser(user), accessToken });
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTS);
  res.json({ user: toPublicUser(user), accessToken });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  const { accessToken, refreshToken } = await authService.refresh(token);
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTS);
  res.json({ accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.status(204).send();
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await authService.getUser(req.user.id);
  res.json({ user: toPublicUser(user) });
});