const connectDb = require("../Config/connectDb");

//@desc     GET ALL Issue Parts
//@route    GET /api/issue-parts/:issue_part_id/details
//@access   Public
const getAllIssuePartsDetails = (req, res) => {
  const issuePartId = req.params.issue_part_id;
  connectDb.query(
    "SELECT * FROM i_p_dtls WHERE issue_part_id = ? ORDER BY updated_at DESC",
    [issuePartId],
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

//@desc     CREATE Issue Parts
//@route    POST /api/issue-parts/:issue_part_id/details
//@access   Public
const createIssuePartsDetail = async (req, res) => {
  const issuePartId = req.params.issue_part_id;
  const {
    part_id,
    store_id,
    bin_id,
    inhand_qty,
    qty,
    part_qty_id,
    created_at,
    updated_at,
  } = req.body;

  // Check if any required field is missing
  if (!part_id || !store_id || !bin_id || !qty || !part_qty_id) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO i_p_dtls (issue_part_id, part_id, store_id, bin_id, inhand_qty, qty, part_qty_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const result = await connectDb.query(
    sql,
    [
      issuePartId,
      part_id,
      store_id,
      bin_id,
      inhand_qty,
      qty,
      part_qty_id,
      created_at,
      updated_at,
    ],
    (err, result) => {
      if (err) {
        console.log("Error creating Issue Parts :", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        return res.status(201).json({ message: "success" });
      }
    }
  );
};


//@desc     UPDATE Issue Parts
//@route    PUT /api/issue-parts/:issue_part_id/details/:detail_id
//@access   Public
const updateIssuePartsDetail = async (req, res) => {
  const issuePartId = req.params.issue_part_id;
  const detailId = req.params.detail_id;
  const {
    part_id,
    store_id,
    bin_id,
    inhand_qty,
    qty,
    part_qty_id,
    created_at,
    updated_at,
  } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !part_id ||
      !store_id ||
      !bin_id ||
      !inhand_qty ||
      !qty ||
      !part_qty_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the issue part in the database
    const sql =
      "UPDATE i_p_dtls SET part_id = ?, store_id = ?, bin_id = ?, inhand_qty = ?, qty = ?, part_qty_id = ?, created_at = ?, updated_at = ? WHERE issue_part_id = ? AND id = ?";
    const result = await connectDb.query(sql, [
      part_id,
      store_id,
      bin_id,
      inhand_qty,
      qty,
      part_qty_id,
      created_at,
      updated_at,
      issuePartId,
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

//@desc     DELETE Issue Parts
//@route    DELETE /api/issue-parts/:issue_part_id/details/:detail_id
//@access   Public
const deleteIssuePartsDetail = async (req, res) => {
  const issuePartId = req.params.issue_part_id;
  const sql = "DELETE FROM i_p_dtls WHERE issue_part_id = ?";
  const result = await connectDb.query(
    sql,
    [issuePartId],
    (err, result) => {
      if (err) {
        console.log("Error delete Issue Parts :", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        return res.status(201).json({ message: "success" });
      }
    }
  );
};

module.exports = {
  getAllIssuePartsDetails,
  createIssuePartsDetail,
  updateIssuePartsDetail,
  deleteIssuePartsDetail,
};
