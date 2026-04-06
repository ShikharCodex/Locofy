const LostPerson = require('../models/LostPerson');
const User = require('../models/User');
const { sendEmail } = require('../config/mailer');

// @desc    Create a lost person record
// @route   POST /api/persons
// @access  Private
const createPerson = async (req, res) => {
  try {
    const {
      name, age, height, weight, gender, 
      lastSeenLocation, lastSeenDate, clothingDescription, 
      additionalNotes, contactPhone, contactEmail
    } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const person = await LostPerson.create({
      name, age, height, weight, gender,
      lastSeenLocation, lastSeenDate, clothingDescription,
      additionalNotes, contactPhone, contactEmail, imageUrl,
      reporterId: req.user.id
    });

    // Notify all users asynchronously
    (async () => {
      try {
        const users = await User.find({}).select('email');
        const emails = users.map(user => user.email).join(',');

        if (emails) {
          const subject = `ALERT: Missing Person Registered - ${name}`;
          const html = `
            <h2>Missing Person Alert</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Last Seen:</strong> ${lastSeenLocation} on ${new Date(lastSeenDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${clothingDescription}</p>
            <p>Please check the application for more details and a photo. If you have any information, please contact the provided reporter details.</p>
            <br/>
            <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/person/${person._id}">View Details</a></p>
          `;
          await sendEmail({
            to: process.env.EMAIL_USER, // Send to self
            bcc: emails, // Hidden list of all users
            subject, 
            text: 'A new missing person has been reported.', 
            html
          });
        }
      } catch (err) {
        console.error('Failed to notify users via email', err);
      }
    })();

    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all lost persons
// @route   GET /api/persons
// @access  Private
const getPersons = async (req, res) => {
  try {
    const { search, location } = req.query;
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (location) {
      query.lastSeenLocation = { $regex: location, $options: 'i' };
    }

    const persons = await LostPerson.find(query).sort({ createdAt: -1 });
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single lost person by ID
// @route   GET /api/persons/:id
// @access  Private
const getPersonById = async (req, res) => {
  try {
    const person = await LostPerson.findById(req.params.id).populate('reporterId', 'name email');
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get persons created by logged in user
// @route   GET /api/persons/user
// @access  Private
const getUserPersons = async (req, res) => {
  try {
    const persons = await LostPerson.find({ reporterId: req.user.id }).sort({ createdAt: -1 });
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a lost person record
// @route   PUT /api/persons/:id
// @access  Private
const updatePerson = async (req, res) => {
  try {
    const person = await LostPerson.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Make sure the logged in user matches the reporter user
    if (person.reporterId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedPerson = await LostPerson.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a lost person record
// @route   DELETE /api/persons/:id
// @access  Private
const deletePerson = async (req, res) => {
  try {
    const person = await LostPerson.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    if (person.reporterId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await person.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createPerson,
  getPersons,
  getPersonById,
  getUserPersons,
  updatePerson,
  deletePerson,
};
