import expressAsyncHandler from "express-async-handler";
import User from "../schema/userSchema.js";
import { admin as adminObj } from '../firebase.js'


const userRegister = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const decoded = await adminObj.auth().verifyIdToken(token)
  const { email } = decoded
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerfied,
      cart: user.cart,
      wishList: user.wishList
    });
  } else {
    res.status(401);
    res.send("Something Went Wrong");
    throw new Error("Invalid User Data");
  }
});
//POST request
// for Authenticating users
//should be public
const authUser = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const decoded = await adminObj.auth().verifyIdToken(token)
  console.log(decoded)
  const { email } = decoded
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User Doesnt Exist");
  }

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      isMember: user.isMember,
    })
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const listUser = expressAsyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.send(users)
  }
  else {
    res.status(400);
    throw new Error("No Users Found");
  }
})

const verifyEmail = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.user;
    const { emailVerified } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error("no user found")
    }
    user.isVerified = emailVerified
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(401);
    throw new Error("sth gone wrong");
  }

})
const memberUpdate = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.user)
    const user = req.user

    if (!user) {
      res.status(401)
      throw new Error("no user found")
    }
    user.isMember = true
    user.membershipDate = Date.now()
    await user.save()
    res.json(user)
    console.log(user)
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }

})
const memberCheck = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error("no user found")
    } else if (user.isMember) {
      res.json({ isMember: user.isMember, membershipDate: user.membershipDate })
    } else {
      res.json({ isMember: false })
    }


  } catch (error) {
    res.status(401);
    throw new Error("sth gone wrong");
  }

})





export { verifyEmail, userRegister, authUser, listUser, memberUpdate, memberCheck };