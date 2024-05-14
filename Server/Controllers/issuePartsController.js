const connectDb = require("../Config/connectDb");

//@desc     GET ALL ISSUE PARTS
//@route    GET /api/issue-parts
//@access   Public
const getAllIssueParts = (req, res) => {
  connectDb.query(
    "SELECT * FROM issue_parts ORDER BY updated_at DESC",
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

//@desc     CREATE ISSUE PART
//@route    POST /api/issue-parts
//@access   Public
const createIssuePart = async (req, res) => {
  const {
    ip_number,
    ip_date,
    issue_for,
    workshop_id,
    workorder_number,
    other_reason,
    comments,
    user_id,
    created_at,
    updated_at,
  } = req.body;

    // Check if all mandatory fields are provided
    if (
      !ip_number ||
      !ip_date ||
      !issue_for ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      console.log("in issue parts",ip_number, ip_date, issue_for, user_id, created_at, updated_at);
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO issue_parts (ip_number, ip_date, issue_for, workshop_id, workorder_number, other_reason, comments, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await connectDb.query(
      sql,
      [
        ip_number,
        ip_date,
        issue_for,
        workshop_id,
        workorder_number,
        other_reason,
        comments,
        user_id,
        created_at,
        updated_at,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating issue part:", err);
          return res.status(500).json({ error: err });
        } else {
          const grnId = result.insertId;
          return res.status(201).json({ message: "success", id: grnId });
        }
      }
    );
  
};

//@desc     UPDATE ISSUE PART
//@route    PUT /api/issue-parts/:id
//@access   Public
const updateIssuePart = async (req, res) => {
  const issuePartId = req.params.id;
  const {
    ip_number,
    ip_date,
    issue_for,
    workshop_id,
    workorder_number,
    other_reason,
    comments,
    user_id,
    created_at,
    updated_at,
  } = req.body;


    if (
      !ip_number ||
      !ip_date ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      console.log(ip_number, ip_date, issue_for, workshop_id, workorder_number, other_reason, comments, user_id, created_at, updated_at);
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the issue part in the database
    const sql =
      "UPDATE issue_parts SET ip_number = ?, ip_date = ?, issue_for = ?, workshop_id = ?, workorder_number = ?, other_reason = ?, comments = ?, user_id = ?,  updated_at = ? WHERE id = ?";
    const result = await connectDb.query(
      sql,
      [
        ip_number,
        ip_date,
        issue_for,
        workshop_id,
        workorder_number,
        other_reason,
        comments,
        user_id,
        updated_at,
        issuePartId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error deleting issue part:", err);
          return res.status(500).json({ error: err });
        } else {
          return res.status(201).json({ message: "success"});
        }
      }
    );
};

//@desc     DELETE ISSUE PART
//@route    DELETE /api/issue-parts/:id
//@access   Public
const deleteIssuePart = async (req, res) => {
  const issuePartId = req.params.id;

  // Delete the issue part from the database
  const sql = "DELETE FROM issue_parts WHERE id = ?";
  connectDb.query(sql, [issuePartId], (err, result) => {
    if (err) {
      console.error("Error deleting issue part:", err);
      return res.status(500).json({ error: err });
    } else {
      return res.status(201).json({ message: "success" });
    }
  });
};

//@desc     GET ISSUE PART
//@route    GET /api/issue-parts/:id
//@access   Public
const getIssuePart = (req, res) => {
  res.status(200).json({ message: `Get issue part ${req.params.id}` });
};

module.exports = {
  getAllIssueParts,
  createIssuePart,
  updateIssuePart,
  deleteIssuePart,
  getIssuePart,
};
