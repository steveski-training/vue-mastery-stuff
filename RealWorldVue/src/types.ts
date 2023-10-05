export interface EventItem {
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    organiser: string;

}

type TodoItemType = 'personal' | 'work' | 'miscellaneous';

export interface TodoItem {
    label: string;
    type: TodoItemType;
    isComplete: boolean;
}
