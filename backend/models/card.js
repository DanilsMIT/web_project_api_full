const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex =
          /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/;
        return regex.test(v);
      },
      message: "URL no valida",
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: "user", default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("card", cardSchema);
