const Customer = require('../models').customers;
const PaginationService = require('../services/pagination');
const customerPagination = new PaginationService(Customer);

exports.getCustomers = async (req, res) => {

    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const customers = await customerPagination.paginate({ page, limit });
    res.send(customers);

}
