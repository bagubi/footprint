// util/responseHandler.js
class ResponseHandler {
    static success(res, data = null, message = '操作成功', code = 200) {
        res.status(code).send({
            code,
            msg: message,
            data
        });
    }

    static error(res, error, message = '操作失败', code = 500) {
        console.log('错误信息：' + error);
        res.status(code).send({
            code,
            msg: message,
            error: error.message || error
        });
    }

    static notFound(res, message = '未找到指定资源') {
        res.status(404).send({
            code: 404,
            msg: message
        });
    }
}

module.exports = ResponseHandler;