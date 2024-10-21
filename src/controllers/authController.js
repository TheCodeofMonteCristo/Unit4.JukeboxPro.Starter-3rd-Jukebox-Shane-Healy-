const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

const prisma = new PrismaClient();

// Register a new user and return a token
async function register(req, res) {
  const { username, password } = req.body;
  
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = jwt.createToken(user); // Create a token for the user
  res.status(201).json({ token });
}

// Login a user and return a token
async function login(req, res) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.createToken(user); // Create a token for the user
  res.json({ token });
}

module.exports = { register, login };
