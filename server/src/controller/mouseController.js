import pusher from "../config/pusherConfig.js";

export const handleMouseMove = (req, res) => {
  const { x, y } = req.body;

  console.log(`Received mouse position: x = ${x}, y = ${y}`);

  pusher.trigger("mouse-channel", "mouse-move", { x, y });

  res.status(200).send({ message: "Mouse position broadcasted!" });
};
