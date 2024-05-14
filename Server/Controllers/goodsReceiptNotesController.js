const connectDb = require("../Config/connectDb");

//@desc     GET ALL goods_receipt_notes
//@route    GET /api/goods_receipt_notes
//@access   Public
const getAllgoods_receipt_notes = (req, res) => {
  connectDb.query(
    "SELECT * FROM goods_receipt_notes ORDER BY updated_at DESC",
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

const getgoods_receipt_notes = (req, res) => {
  const Id = req.params.id;
  connectDb.query(
    "SELECT * FROM goods_receipt_notes WHERE purchase_order_id = ? ORDER BY updated_at DESC",
    [Id],
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

//@desc     CREATE goods_receipt_notes
//@route    POST /api/goods_receipt_notes
//@access   Public
const creategoods_receipt_notes = async (req, res) => {
  const {
    grn_number,
    grn_date,
    comments,
    purchase_order_id,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  // Check for mandatory fields
  if (!grn_number || !grn_date || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }
  const sql = `INSERT INTO goods_receipt_notes 
                (grn_number, grn_date, comments, purchase_order_id, user_id, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connectDb.query(
    sql,
    [
      grn_number,
      grn_date,
      comments,
      purchase_order_id,
      user_id,
      created_at,
      updated_at,
    ],
    (err, result) => {
      if (err) {
        console.log("Error adding goods receipt note:", err);
        return res
          .status(500)
          .json({ error: "Failed to add goods receipt note" });
      } else {
        const grnId = result.insertId;
        return res.status(201).json({ message: "success", id: grnId });
      }
    }
  );
};

//@desc     UPDATE goods_receipt_notes
//@route    PUT /api/goods_receipt_notes/:id
//@access   Public
const updategoods_receipt_notes = async (req, res) => {
  const {
    grn_number,
    grn_date,
    comments,
    purchase_order_id,
    user_id,
    updated_at,
  } = req.body;
  const id = req.params.id;
  // Check for mandatory fields
  if (!grn_number || !grn_date || !user_id || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql = `UPDATE goods_receipt_notes 
                SET grn_number = ?, grn_date = ?, comments = ?, purchase_order_id = ?, user_id = ?, updated_at = ? 
                WHERE id = ?`;

  connectDb.query(
    sql,
    [
      grn_number,
      grn_date,
      comments,
      purchase_order_id,
      user_id,
      updated_at,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating goods receipt note:", err);
        return res
          .status(500)
          .json({ error: "Failed to update goods receipt note" });
      } else {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};

//@desc     DELETE goods_receipt_notes
//@route    DELETE /api/goods_receipt_notes/:id
//@access   Public
const deletegoods_receipt_notes = async (req, res) => {
  const Id = req.params.id;
  // Delete the goods_receipt_notes from the database
  const sql = "DELETE FROM goods_receipt_notes WHERE id = ?";
  connectDb.query(sql, [Id], (err, result) => {
    if (err) {
      console.log("Error delete goods receipt note:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete goods receipt note" });
    } else {
      return res.status(201).json({ message: "success" });
    }
  });
};

//@desc     GET goods_receipt_notes
//@route    GET /api/goods_receipt_notes/:id
//@access   Public


module.exports = {
  getAllgoods_receipt_notes,
  creategoods_receipt_notes,
  updategoods_receipt_notes,
  deletegoods_receipt_notes,
  getgoods_receipt_notes,
};
