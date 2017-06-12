import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadUserMessages(id) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/${id}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USER_MESSAGES,
            id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  createLastAccess(toUserId, lastAccess) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.ACCESSES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId, last_access: lastAccess})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  updateLastAccess(toUserId, lastAccess) {
    return new Promise((resolve, reject) => {
      request
      .put(`${APIEndpoints.ACCESSES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId, last_access: lastAccess})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveMessage(content, toUserId, createdAt) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        content,
        to_user_id: toUserId,
        created_at: createdAt,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            content,
            to_user_id: toUserId,
            created_at: createdAt,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveImageChat(file, toUserId, userId, createdAt) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('to_user_id', toUserId)
      .end((error, res) => {
        if (!error && res.status === 200) {
          let json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            image: file.name,
            to_user_id: toUserId,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
