const { Schema, model, Types: { ObjectId } } = require('mongoose');

const ProjectSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  tags: [{
    type: String,
    required: true,
  }],
  attachment: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [0, 1], // 0 = Onetime 1 = Hourly
  },
}, { timestamps: true, versionKey: false });

ProjectSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'user', 'active', 'title', 'description', 'tags', 'attachment', 'type'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

module.exports = model('projects', ProjectSchema);
