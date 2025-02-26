const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    index: true
  },
  month: {
    type: String,
    required: true,
    enum: [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ],
    index: true
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100,
    default: () => new Date().getFullYear()
  },
  days: [{
    day: {
      type: Number,
      min: 1,
      max: 31
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Leave'],
      default: 'Absent'
    }
  }]
});

// Compound unique index to prevent duplicate entries
attendanceSchema.index(
  { employee: 1, month: 1, year: 1 },
  { unique: true, name: 'unique_employee_month_year' }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;