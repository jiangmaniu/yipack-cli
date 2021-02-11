module.exports = `
import request from '@src/request/api.js';
module.exports = {
    // 接口示例
    test(params) {
        return request({
            method: 'post',
            url: '/test',
            params: params
        });
    }
};
`;
