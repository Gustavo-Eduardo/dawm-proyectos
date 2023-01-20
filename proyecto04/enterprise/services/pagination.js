const Sequelize = require('sequelize');

class PaginationService {
    constructor(model) {
        this.model = model;
    }

    async paginate(options = {}) {
        const { page = 1, limit = 10, ...where } = options;
        const offset = (page - 1) * limit;

        const result = await this.model.findAndCountAll({
            where,
            offset,
            limit
        });

        return {
            data: result.rows,
            meta: {
                currentPage: page,
                perPage: limit,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count
            }
        };
    }
}

module.exports = PaginationService