const express = require("express");
const app = express();
const userRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const availablehoursRoutes = require("./routes/availablehours");
const breakRoute = require("./routes/break");
const workedhoursRoutes = require("./routes/workedhours");
const proposalRoutes = require("./routes/proposal");
const contactRoutes = require("./routes/contact");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("./db/dbconfig");
dotenv.config();
const PORT = process.env.PORT || 5000;


//middlewares
app.use(express.json());
app.use(cookieParser());
connect();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/whours", workedhoursRoutes);
app.use("/api/v1/ahours", availablehoursRoutes);
app.use("/api/v1/break", breakRoute);
app.use("/api/v1/proposal", proposalRoutes);
app.use("/api/v1/contact", contactRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
