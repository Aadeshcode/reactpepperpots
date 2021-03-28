import Coupon from "../schema/couponsSchema.js";
import asyncHandler from 'express-async-handler'
export const addCoupon = asyncHandler(async (req, res) => {
  try {
    const { code, description, giver, discount, expiry, onlyForMembers, image } = req.body;

    const coupon = new Coupon({
      code,
      description,
      giver,
      discount,
      expiry,
      onlyForMembers,
      image
    });
    const newcoupon = await coupon.save();
    res.json(newcoupon);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (coupon && coupon.onlyForMembers && req.user.isMember) {
      if (coupon.users.includes(`${req.user._id}`)) {
        res.json({ error: "Coupon Already Used" })
      } else {
        res.json(coupon);
      }
    } else if (coupon && coupon.onlyForMembers && !req.user.isMember) {
      res.json({ error: "Not Authorised As a Member" })
    }
    else if (coupon) {
      if (coupon.users.includes(`${req.user._id}`)) {
        res.json({ error: "Coupon Already Used" })
      } else {
        res.json(coupon);
      }

    } else {
      res.json({ error: "Coupon not found" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getCoupons = asyncHandler(async (req, res) => {

  try {
    const coupon = await Coupon.find(req.query.onlyForMembers ? { onlyForMembers: Boolean(req.query.onlyForMembers) } : {});
    if (coupon) {
      res.json(coupon);
    } else {
      res.json("Coupons not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const deleteCoupons = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (coupon) {
      await coupon.remove();
      res.json("Removed");
    } else {
      res.json("Coupon not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
export const editCoupons = asyncHandler(async (req, res) => {
  try {
    const { code, description, giver, discount, onlyForMembers, expiry } = req.body;
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (req.user) {
      if (coupon) {
        coupon.code = code;
        coupon.description = description;
        coupon.giver = giver;
        coupon.discount = discount;
        coupon.expiry = expiry;
        coupon.onlyForMembers = onlyForMembers,
          coupon.image = image

        await coupon.save();
        res.json("Your Coupon is Updated");
      } else {
        res.json("Coupon not found");
      }
    } else {
      if (coupon) {
        coupon.code = code;
        coupon.description = description;
        coupon.giver = giver;
        coupon.discount = discount;
        coupon.expiry = expiry;
        coupon.usedBy = coupon.usedBy;
        await coupon.save();
        res.json("Your Coupon is Updated");
      } else {
        res.json("Coupon not found");
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const couponAddUser = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    console.log(coupon)
    coupon.users.push(req.user._id)
    await coupon.save()
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})