const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorhandler } = require("./middleware/errorHandler");

const port = process.env.API_PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/bins", require("./Routes/binRoutes"));
app.use("/api/categories", require("./Routes/categoriesRoutes"));
app.use("/api/stores", require("./Routes/storesRouter"));
app.use("/api/vendors", require("./Routes/vendorRoutes"));
app.use("/api/parts", require("./Routes/partRouter"));
app.use("/api/workshops", require("./Routes/workshopRoutes"));
app.use("/api/quantities", require("./Routes/quantityRoutes"));
app.use("/api/purchaseOrders", require("./Routes/purchaseOrder"));
app.use("/api/po_dtls", require("./Routes/po_dtlsRoutes"));
app.use(errorhandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
