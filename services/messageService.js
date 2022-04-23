import asyncHandler from "express-async-handler"
import user from "../models/user.js";
import chat from "../models/chat.js";
import message from "../models/message.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//@description     Get all Messages
//@route           GET /Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await message.find({ chat: req.params.chatId })
      .populate("sender", "name profileImageUrl email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await message.create(newMessage);

    message = await message.populate("sender", "name profileImageUrl").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await user.populate(message, {
      path: "chat.users",
      select: "name profileImageUrl email",
    });

    await chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export { allMessages, sendMessage };