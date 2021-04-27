const Mock = require("mockjs")
module.exports = {
    'GET /api/posts': (req, res) => {
        res.status(200).json({
            users: Mock.mock({
                'data|100': [
                    {
                        id: '@id',
                        name: '@name',
                        nickName: '@last',
                        phone: /^1[345678]\d{9}$/,
                        'age|11-99': 1,
                        // address() {
                        //     return Mock.Random.county(true)
                        // },
                        address: '@county(true)',
                        isMale: '@boolean',
                        email: '@email',
                        createTime: '@datetime',
                        avatar() {
                            return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substring())
                        }
                    }
                ]
            })
        })
    }
}