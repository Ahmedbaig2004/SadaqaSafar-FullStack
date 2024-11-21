import User from "../models/User.js";
import NGO from "../models/NGO.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { name, password, profilePicture } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (password) user.password = password;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNGOProfile = async (req, res) => {
  try {
    const { name, password, registrationNumber, domain, description, logo } = req.body;
    const ngo = await NGO.findById(req.ngo.id);

    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    if (name) ngo.name = name;
    if (password) ngo.password = password;
    if (registrationNumber) ngo.registrationNumber = registrationNumber;
    if (domain) ngo.domain = domain;
    if (description) ngo.description = description;
    if (logo) ngo.logo = logo;

    await ngo.save();
    res.json({ message: "Profile updated successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
