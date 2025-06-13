import { Router } from "express";
import { spawn } from "child_process";

const router = Router();

router.post("/generate-scene", (req, res) => {
  const prompt = req.body.prompt || "";
  console.log("🟡 Received prompt:", prompt); // 🟡 LOG prompt

  const py = spawn("python", ["./gamelogic/bankRobberyGenerator.py", prompt]);

  let data = "";
  py.stdout.on("data", (chunk) => {
    console.log("🟢 Python output:", chunk.toString()); // 🟢 LOG python output
    data += chunk.toString();
  });

  py.stderr.on("data", (err) => {
    console.error("🔴 Python error:", err.toString()); // 🔴 LOG python error
  });

  py.on("close", () => {
    try {
      const json = JSON.parse(data);
      console.log("✅ Parsed JSON:", json); // ✅ LOG parsed JSON
      res.json(json);
    } catch (err) {
      console.error("❌ JSON parse error:", err); // ❌ CATCH parse error
      res.status(500).json({ error: "Invalid JSON from Python" });
    }
  });
});

export default router;
