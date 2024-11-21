import User from "../models/User.js";
import NGO from "../models/NGO.js";
import bcrypt from 'bcryptjs';

export const updateUserProfile = async (req, res) => {
  try {
    if (req.userRole !== 'user') {
      return res.status(403).json({ message: 'Not authorized as user' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, password, profilePicture } = req.body;

    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    if (password) user.password = password;

    const updatedUser = await user.save();
    
    res.json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateNGOProfile = async (req, res) => {
  try {
    if (req.userRole !== 'ngo') {
      return res.status(403).json({ message: 'Not authorized as NGO' });
    }

    const ngo = await NGO.findById(req.user._id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    const { name, password, registrationNumber, domain, description, logo } = req.body;

    if (name) ngo.name = name;
    if (registrationNumber) ngo.registrationNumber = registrationNumber;
    if (domain) ngo.domain = domain;
    if (description) ngo.description = description;
    if (logo) ngo.logo = logo;
    if (password) ngo.password = password;

    const updatedNGO = await ngo.save();
    
    res.json({
      ngo: {
        _id: updatedNGO._id,
        name: updatedNGO.name,
        email: updatedNGO.email,
        role: updatedNGO.role,
        registrationNumber: updatedNGO.registrationNumber,
        domain: updatedNGO.domain,
        description: updatedNGO.description,
        logo: updatedNGO.logo
      }
    });
  } catch (error) {
    console.error('NGO Profile update error:', error);
    res.status(500).json({ message: error.message });
  }
};