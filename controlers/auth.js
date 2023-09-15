const { SECRET_KEY, BASE_URL } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../models/users");
const { CreateHttpError, ctrlWrapper, sendEmail } = require("../helpers");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const crypto = require("node:crypto");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw CreateHttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a targer="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).send({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateHttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw CreateHttpError(401, "Email nor verified");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw CreateHttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).send({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send({
    message: "Logout success",
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw CreateHttpError(400, "Invalid subscription type");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw CreateHttpError(404, "Not found");
  }

  res.status(200).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).writeAsync(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).send({
    avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw CreateHttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).send({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateHttpError(404, "Email not found");
  }
  if (user.verify) {
    throw CreateHttpError(400, "Verification has already been passed");
  }
   const verifyEmail = {
     to: email,
     subject: "Verify email",
     html: `<a targer="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click link to verify email</a>`,
   };
   await sendEmail(verifyEmail);
   res.status(200).send({ message: "Verification email sent" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
