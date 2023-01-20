const Customer = require('../models').customers;
const PaginationService = require('../services/pagination');
const customerPagination = new PaginationService(Customer);

exports.getCustomers = async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const customers = await customerPagination.paginate({ page, limit });
    res.send(customers);

}
