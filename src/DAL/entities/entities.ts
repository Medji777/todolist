export interface ITask {
    description?: string,
    done: boolean,
    id: string,
    title: string,
}

export interface IStateAll<T> {
    todo: T
}

export interface IInitialState {
    tasks: ITask[] | [],
    status: string,
    messageError: string,
    filterValue: string
}