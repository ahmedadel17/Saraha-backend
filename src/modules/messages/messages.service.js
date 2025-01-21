import Message from "../../DB/models/message.model.js";
export const getSentMessage = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const messages = await Message.find({ sender: _id }).populate(
    "sender receiver"
  );
  console.log(messages);
  return res.status(200).json({ success: "True", messages });
};
export const getReceivedMessage = async (req, res) => {
  const { _id } = req.user;
  const messages = await Message.find({ receiver: _id }).populate(
    "sender receiver"
  );
  return res.status(200).json({ success: "True", messages });
};
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const deleted = await Message.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: "True", message: "message deleted Successfully" });
};
export const createMessage = async (req, res) => {
  const { receiver, content } = req.body;
  const sender = req.user._id;
  const message = await Message.create({ sender, receiver, content });
  return res.status(200).json({ message: "create message" });
};
