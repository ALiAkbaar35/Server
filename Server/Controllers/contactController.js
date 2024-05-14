
//@desc     GET ALL CONTACTS
//@route    GET /api/contacts
//@access   Public
const getContacts = (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
 
};

//@desc     CREATE CONTACT
//@route    POST /api/contacts
//@access   Public
const createContact = (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(200).json({ message: "Create contact" });
};

//@desc     UPDATE CONTACT
//@route    PUT /api/contacts
//@access   Public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact ${req.params.id}` });
};

//@desc     DELETE CONTACT
//@route    DELETE /api/contacts
//@access   Public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact ${req.params.id}` });
};

//@desc     GET CONTACT
//@route    GET /api/contacts
//@access   Public
const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact ${req.params.id}` });
};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact,
};
