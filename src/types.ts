export interface RequestData {
    body?: any,

    params?: {
        [key:string]: string
    },

    headers?: {
        [key:string]: string
    }
}

