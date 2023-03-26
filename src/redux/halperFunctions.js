/**
 * Boards functions
 **/

/**
 * Lists functions
 **/
export function getListById(boards, listId) {
    let list;
    boards.forEach(board => {
        board.lists.forEach(l => {
            if (l.id === listId) list = l;
        })
    })
    return list;
}


export function setList(boards, list) {
    const board = boards.find(board => board.id === list.boardId)
    board.lists.push(list);
}


export function removeList(boards, list) {
    const board = boards.find(board => board.id === list.boardId)
    board.lists = board.lists.filter(l => l.id !== list.id);
}

/**
 * Tasks functions
 **/

export function getTaskById(boards, taskId) {
    let task;
    boards.forEach(board => {
        board.lists.forEach(list => {
            list.tasks.forEach(t => {
                if (t.id === taskId) task = t;
            });
        })
    })
    return task;
}

export function setTask(boards, task) {
    const board = boards.find(board => board.id === task.boardId);
    const list = board.lists.find(list => list.id === task.listId);
    list.tasks.push(task);
}

export function removeTask(boards, task) {
    const board = boards.find(board => board.id === task.boardId);
    const list = board.lists.find(list => list.id === task.listId);
    list.tasks = list.tasks.filter(t => t.id !== task.id);
}

