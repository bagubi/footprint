// api/todo.js
// 待办相关云函数调用

/**
 * AI 解析自然语言创建待办
 * @param {string} text - 用户输入的文字
 * @returns {Promise}
 */
export function createTodoByAI(text) {
  return new Promise((resolve, reject) => {
    if (typeof uniCloud === 'undefined') {
      reject('uniCloud 未初始化');
      return;
    }

    uniCloud.callFunction({
      name: 'parseTodo',
      data: { text },
      success: (res) => {
        console.log('解析结果:', res);
        
        if (res.result && res.result.code === 0) {
          resolve(res.result.data);
        } else {
          reject(res.result?.message || '解析失败');
        }
      },
      fail: (err) => {
        console.error('云函数调用失败:', err);
        reject(err.message || '网络请求失败');
      }
    });
  });
}

/**
 * 获取待办列表
 * @returns {Promise}
 */
export function getTodoList() {
  return new Promise((resolve, reject) => {
    // 从云数据库获取待办列表
    const db = uniCloud.database();
    db.collection('todo')
      .where({
        status: 'pending' // 只获取未完成的
      })
      .orderBy('time', 'asc')
      .get()
      .then((res) => {
        if (res.result && res.result.data) {
          resolve(res.result.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        console.error('获取待办失败:', err);
        reject(err.message);
      });
  });
}

/**
 * 切换待办状态
 * @param {string} id - 待办ID
 */
export function toggleTodoStatus(id) {
  return new Promise((resolve, reject) => {
    const db = uniCloud.database();
    // 先查询当前状态
    db.collection('todo')
      .doc(id)
      .get()
      .then((res) => {
        const todo = res.result.data[0];
        if (!todo) {
          reject('待办不存在');
          return;
        }
        
        const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
        return db.collection('todo').doc(id).update({
          status: newStatus
        });
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error('切换状态失败:', err);
        reject(err.message);
      });
  });
}

/**
 * 删除待办
 * @param {string} id - 待办ID
 */
export function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    const db = uniCloud.database();
    db.collection('todo')
      .doc(id)
      .remove()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error('删除失败:', err);
        reject(err.message);
      });
  });
}

/**
 * 保存待办到数据库
 * @param {Object} todo - 待办数据
 */
export function saveTodo(todo) {
  return new Promise((resolve, reject) => {
    const db = uniCloud.database();
    db.collection('todo')
      .add({
        ...todo,
        createTime: new Date()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('保存失败:', err);
        reject(err.message);
      });
  });
}