module.exports = `
import request from '@src/request/api.js';
export default {
    // 添加
    insert(params) {
        return request({
            method: 'post',
            url: '/insert',
            params: params
        });
    },
    // 删除
    delete(params) {
        return request({
            method: 'post',
            url: '/delete',
            params: params
        });
    },
    // 更新
    update(params) {
        return request({
            method: 'post',
            url: '/update',
            params: params
        });
    },
    // 查询
    select(params) {
        return request({
            method: 'post',
            url: '/select',
            params: params
        });
    }
};
`;
