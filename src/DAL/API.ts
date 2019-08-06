import axios from "./axios-instance";

const API = {
    getTasks(widgetId: number, page = 1, count = 15) {
        return axios.get(`?widgetId=${widgetId}&page=${page}&count=${count}`)
    },
    postTasks(widgetId: number, title: string) {
        return axios.post('', {
            widgetId,
            title
        })
    },
    putTask(widgetId: number, taskId: string, obj: any){
        return axios.put('', {
            widgetId,
            taskId,
            ...obj
        })
    },
    deleteTasks(widgetId: number, taskId: string) {
        return axios.delete(`?widgetId=${widgetId}&taskId=${taskId}`)
    }
};

export default API;