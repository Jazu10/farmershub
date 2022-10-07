class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const name = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: "i",
                  },
              }
            : {};
        const seller = this.queryStr.keyword
            ? {
                  seller: {
                      $regex: this.queryStr.keyword,
                      $options: "i",
                  },
              }
            : {};
        const category = this.queryStr.keyword
            ? {
                  category: {
                      $regex: this.queryStr.keyword,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({
            $or: [{ ...name }, { ...seller }, { ...category }],
        });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`,
        );

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
