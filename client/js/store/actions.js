export const set = (name, payload) => ({ type: 'SET', name, payload })

export const add = (name, payload) => ({ type: 'ADD', name, payload })

export const push = (name, payload) => ({ type: 'PUSH', name, payload })

export const updateStatus = (id, boolean) => ({ type: 'UPDATE_STATUS', id, boolean })

export const remove = (name, id) => ({ type: 'DELETE', name, id })