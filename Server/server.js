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
app.use("/api/goodsReceiptNotes", require("./Routes/goodsReceiptNotesRoutes"));
app.use("/api/grn_dtls", require("./Routes/grn_dtlsRoutes"));
app.use("/api/issueParts", require("./Routes/issuePartsRoutes"));
app.use("/api/i_p_dtls", require("./Routes/i_P_dtlsRoutes"));
app.use("/api/companies", require("./Routes/companiesRoutes"));
app.use("/api/roles", require("./Routes/rolesRoutes"));
app.use("/api/sites", require("./Routes/siteRoutes"));
app.use("/api/departments", require("./Routes/departmentRoutes"));
app.use("/api/login", require("./Routes/loginRoutes"));
app.use("/api/signup", require("./Routes/signupRoutes")); 
//app.use("/api/register", require("./Routes/jsonConfig.js"));

app.use(errorhandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
