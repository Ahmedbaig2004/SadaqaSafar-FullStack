import Donation from '../models/Donation.js';
import Cause from '../models/Cause.js';
import stripe from 'stripe';
import jwt from 'jsonwebtoken';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createDonation = async (req, res) => {
  try {
    const { causeId, amount, anonymous, message } = req.body;
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const cause = await Cause.findById(causeId);

    if (!cause) {
      return res.status(404).json({ message: 'Cause not found' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'inr',
      metadata: { causeId, userId: user.id }
    });

    const donation = await Donation.create({
      user: user.id,
      cause: causeId,
      amount,
      paymentId: paymentIntent.id,
      anonymous,
      message
    });

    // Update cause raised amount
    await Cause.findByIdAndUpdate(causeId, {
      $inc: { raisedAmount: amount }
    });

    res.status(201).json({
      donation,
      clientSecret: paymentIntent.client_secret
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