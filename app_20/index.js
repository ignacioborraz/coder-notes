import express from "express";
import {
  addition,
  subtraction,
  division,
  multiplation,
} from "coder-calculator";

const server = express();

const PORT = process.env.PORT || 8081;
const ready = () => console.log("server ready on port " + PORT);

server.use(express.urlencoded({ extended: true }));
server.use("/suma/:n1/:n2", (req, res) => {
  try {
    let n1 = req.params.n1;
    let n2 = req.params.n2;
    return res.status(200).json({
      total: addition(n1, n2),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
server.use("/resta/:n1/:n2", (req, res) => {
  try {
    let n1 = req.params.n1;
    let n2 = req.params.n2;
    return res.status(200).json({
      total: subtraction(n1, n2),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
server.use("/division/:n1/:n2", (req, res) => {
  try {
    let n1 = req.params.n1;
    let n2 = req.params.n2;
    return res.status(200).json({
      total: division(n1, n2),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
server.use("/producto/:n1/:n2", (req, res) => {
  try {
    let n1 = req.params.n1;
    let n2 = req.params.n2;
    return res.status(200).json({
      total: multiplation(n1, n2),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

server.listen(PORT, ready);
