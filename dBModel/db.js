const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BASE_URL = process.env.NODE_ENV === "development" 
  ? `mongodb://127.0.0.1:27017/${process.env.DEVELOPMENT_MONGO_DB_NAME}`
  : `mongodb+srv://${process.env.PRODUCTION_MONGO_DB_USER_NAME}:${process.env.PRODUCTION_MONGO_DB_PASSWORD}@zenclass.hqloa5m.mongodb.net/${process.env.PRODUCTION_MONGO_DB_NAME}`;

const dbConnect = async () => {
  try {
    await mongoose.connect(BASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("DATABASE CONNECTION SUCCESSFUL");
  } catch (e) {
    console.error("ERROR CONNECTING DATABASE:", e.message);
  }
};

const studentSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: schema.Types.ObjectId,
    default: null,
    ref: "mentor",
  },
});

const student = mongoose.model("student", studentSchema, "student");

const mentorSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentor", mentorSchema, "mentor");


module.exports = { dbConnect, student, mentor };
