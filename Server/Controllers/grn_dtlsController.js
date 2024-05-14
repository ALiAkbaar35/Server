const connectDb = require("../Config/connectDb");

//@desc     GET ALL GRN Details
//@route    GET /api/goodsReceiptNotes/:goods_receipt_note_id/details
//@access   Public
const getAllGRN_Details = (req, res) => {
  connectDb.query(
    "SELECT * FROM grn_dtls ORDER BY updated_at DESC",
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

const getAllGRNDetails = (req, res) => {
  const Id = req.params.id;
  connectDb.query(
    "SELECT * FROM grn_dtls WHERE goods_receipt_notes_id = ? ORDER BY updated_at DESC",
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

//@desc     CREATE GRN Details
//@route    POST /api/goodsReceiptNotes/:goods_receipt_note_id/details
//@access   Public
const createGRNDetails = async (req, res) => {
  const Id = req.params.id;
  const {
    part_id,
    store_id,
    bin_id,
    poqty,
    grnqty,
    created_at,
    updated_at,
  } = req.body;

  if (
    !part_id ||
    !store_id ||
    !bin_id ||
    !poqty ||
    !grnqty ||
    !created_at ||
    !updated_at
  ) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO grn_dtls (goods_receipt_notes_id, part_id, store_id, bin_id, poqty, grnqty, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const result = await connectDb.query(
    sql,
    [Id, part_id, store_id, bin_id, poqty, grnqty, created_at, updated_at],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        return res.status(201).json({ message: "success" });
      }
    }
  );
};

//@desc     UPDATE GRN Details
//@route    PUT /api/goodsReceiptNotes/:goods_receipt_note_id/details/:detail_id
//@access   Public
const updateGRNDetails = async (req, res) => {
  const goodsReceiptNoteId = req.params.goods_receipt_note_id;
  const detailId = req.params.detail_id;
  const { part_id, store_id, bin_id, poqty, grnqty, created_at, updated_at } =
    req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !part_id ||
      !store_id ||
      !bin_id ||
      !poqty ||
      !grnqty ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the GRN detail in the database
    const sql =
      "UPDATE grn_dtls SET part_id = ?, store_id = ?, bin_id = ?, poqty = ?, grnqty = ?, created_at = ?, updated_at = ? WHERE goods_receipt_notes_id = ? AND id = ?";
    const result = await connectDb.query(sql, [
      part_id,
      store_id,
      bin_id,
      poqty,
      grnqty,
      created_at,
      updated_at,
      goodsReceiptNoteId,
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

//@desc     DELETE GRN Details
//@route    DELETE /api/goodsReceiptNotes/:goods_receipt_note_id/details/:detail_id
//@access   Public
const deleteGRNDetails = async (req, res) => {
  const Id = req.params.id;
  const sql = "DELETE FROM grn_dtls WHERE goods_receipt_notes_id = ?";
  const result = await connectDb.query(sql, [Id], (err, result) => {
    if (err) {
      console.log("Error delete GRN Details :", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      return res.status(201).json({ message: "success" });
    }
  });
};

module.exports = {
  getAllGRN_Details,
  getAllGRNDetails,
  createGRNDetails,
  updateGRNDetails,
  deleteGRNDetails,
};
