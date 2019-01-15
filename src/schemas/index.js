import { schema } from 'normalizr';

const article = new schema.Entity('articles', {}, {
  idAttribute: (value, parent) => {
    console.log('parent: ' + parent.id)
    return value.id + "_" + parent.id
  }
})
const task = new schema.Entity('tasks', { articles: new schema.Array(article) })
const tasks = [task];

export default tasks