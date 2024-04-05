const connectDb = require("../Config/connectDb");

//@desc     GET ALL purchaseOrder Details
//@route    GET /api/purchaseOrder/:purchase_order_id/details
//@access   Public
const getAllPurchaseOrderDetails = (req, res) => {
  const purchaseOrderId = req.params.purchase_order_id;
  connectDb.query(
    "SELECT * FROM po_dtls WHERE purchase_order_id = ? ORDER BY created_at DESC",
    [purchaseOrderId],
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data from the database:", error);
        return res
          .status(500)
          .json({ error: "Error fetching data from the database" });
      }
      res.status(200).json({ message: "success", data: results });
    }
  );
};

//@desc     CREATE purchaseOrder Details
//@route    POST /api/purchaseOrder/:purchase_order_id/details
//@access   Public
const createPurchaseOrderDetails = async (req, res) => {
  const purchaseOrderId = req.params.purchase_order_id;
  const { part_id, qty, price, amount, created_at, updated_at } = req.body;
  
    // Check if all mandatory fields are provided
    if (!part_id || !qty || !price || !amount || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO po_dtls (purchase_order_id, part_id, qty, price, amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await connectDb.query(sql, [
      purchaseOrderId,
      part_id,
      qty,
      price,
      amount,
      created_at,
      updated_at,
    ],
    (err, result) => {
        if (err) {
          return res.status(500).json({ error:result.error});
        } else {
          return res.status(201).json({ message: "success" });
        }
      }
    );

};

//@desc     UPDATE purchaseOrder Details
//@route    PUT /api/purchaseOrder/:purchase_order_id/details/:detail_id
//@access   Public
const updatePurchaseOrderDetails = async (req, res) => {
  const purchaseOrderId = req.params.purchase_order_id;
  const detailId = req.params.detail_id;
  const { part_id, qty, price, amount, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!part_id || !qty || !price || !amount || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the purchaseOrder detail in the database
    const sql =
      "UPDATE po_dtls SET part_id = ?, qty = ?, price = ?, amount = ?, created_at = ?, updated_at = ? WHERE purchase_order_id = ? AND id = ?";
    const result = await connectDb.query(sql, [
      part_id,
      qty,
      price,
      amount,
      created_at,
      updated_at,
      purchaseOrderId,
      detailId,
    ]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE purchaseOrder Details
//@route    DELETE /api/purchaseOrder/:purchase_order_id/details/:detail_id
//@access   Public
const deletePurchaseOrderDetails = async (req, res) => {
  const purchaseOrderId = req.params.purchase_order_id; 
    const sql = "DELETE FROM po_dtls WHERE purchase_order_id = ?";
    const result = await connectDb.query(sql, [purchaseOrderId],
     (err, result) => {
        if (err) {
          console.log("Error delete Purchase Order :", err);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          return res.status(201).json({ message: "success" });
        }
      }
    );
};

module.exports = {
  getAllPurchaseOrderDetails,
  createPurchaseOrderDetails,
  updatePurchaseOrderDetails,
  deletePurchaseOrderDetails,
};
