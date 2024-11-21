import Donation from '../models/Donation.js';
import Cause from '../models/Cause.js';
import jwt from 'jsonwebtoken';

export const createDonation = async (req, res) => {
  try {
    const { causeId, amount, anonymous, message } = req.body;
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const cause = await Cause.findById(causeId);

    if (!cause) {
      return res.status(404).json({ message: 'Cause not found' });
    }

    const donation = await Donation.create({
      user: user.id,
      cause: causeId,
      amount,
      paymentId: "kuchbhi",
      anonymous,
      message
    });

    // Update cause raised amount
    await Cause.findByIdAndUpdate(causeId, {
      $inc: { raisedAmount: amount }
    });

    res.status(201).json({
      donation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: user.id })
      .populate('cause', 'title')
      .sort('-createdAt');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};