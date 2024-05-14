const connectDb = require("../Config/connectDb");

//@desc     GET ALL purchaseOrder
//@route    GET /api/purchaseOrder
//@access   Public
const getAllpurchaseOrder = (req, res) => {
  connectDb.query(
    "SELECT * FROM purchase_orders ORDER BY updated_at DESC",
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

//@desc     CREATE CATEGORY
//@route    POST /api/purchaseOrder
//@access   Public
const createpurchaseOrder = async (req, res) => {
  const {
    po_number,
    order_date,
    vendor_id,
    ref_number,
    ref_date,
    status,
    comments,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  // Check for mandatory fields
  if (
    !po_number ||
    !order_date ||
    !vendor_id ||
    !user_id ||
    !created_at ||
    !updated_at
  ) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }
  const sql = `INSERT INTO purchase_orders 
                (po_number, order_date, vendor_id, ref_number, ref_date, status, comments, user_id, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await connectDb.query(
    sql,
    [
      po_number,
      order_date,
      vendor_id,
      ref_number,
      ref_date,
      status,
      comments,
      user_id,
      created_at,
      updated_at,
    ],
    (err, result) => {
      if (err) {
        console.log("Error adding purchase order:", err);
        return res.status(500).json({ error: result.error });
      } else {
        const PurchaseId = result.insertId;
        return res.status(201).json({ message: "success", id: PurchaseId });
      }
    }
  );
};


//@desc     UPDATE CATEGORY
//@route    PUT /api/purchaseOrder/:id
//@access   Public
const updatepurchaseOrder = async (req, res) => {
  const {
    po_number,
    order_date,
    vendor_id,
    ref_number,
    ref_date,
    status,
    comments,
    user_id,
    updated_at,
  } = req.body;
  const id = req.params.id;
  // Check for mandatory fields
  if (!po_number || !order_date || !vendor_id || !user_id || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql = `UPDATE purchase_orders 
                SET po_number = ?, order_date = ?, vendor_id = ?, ref_number = ?, ref_date = ?, status = ?, comments = ?, user_id = ?, updated_at = ? 
                WHERE id = ?`;

  await connectDb.query(
    sql,
    [
      po_number,
      order_date,
      vendor_id,
      ref_number,
      ref_date,
      status,
      comments,
      user_id,
      updated_at,
      id, 
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating purchase order:", err);
        return res.status(500).json({ error: result.error });
      } else {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};


//@desc     DELETE CATEGORY
//@route    DELETE /api/purchaseOrder/:id
//@access   Public
const deletepurchaseOrder = async (req, res) => {
  const purchaseOrderId = req.params.id;
    // Delete the purchaseOrder from the database
    const sql = "DELETE FROM purchase_orders WHERE id = ?";
    const result = await connectDb.query(
      sql,
      [purchaseOrderId],
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

//@desc     GET CATEGORY
//@route    GET /api/purchaseOrder/:id
//@access   Public
const getpurchaseOrder = (req, res) => {
  res.status(200).json({ message: `Get purchaseOrder ${req.params.id}` });
};


const updatePartStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update the status of the part in the database
    const sql = "UPDATE purchase_orders SET status = ? WHERE id = ?";
    const result = await connectDb.query(sql, [status, id]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to update part status" });
  }
};



module.exports = {
  getAllpurchaseOrder,
  createpurchaseOrder,
  updatePartStatus,
  updatepurchaseOrder,
  deletepurchaseOrder,
  getpurchaseOrder,
};
