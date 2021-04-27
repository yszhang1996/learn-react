module.exports = {
    "GET /api/products": (req, res) => {
        const params = req.query ? req.query : `null`;
        console.log(params);
        res.send({
            "name": "高粱" + params.id,
            id: params.id
        })
    }
}