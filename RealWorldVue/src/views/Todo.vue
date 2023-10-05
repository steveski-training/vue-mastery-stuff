<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue';
import { TodoItem } from '@/types';

const state = reactive({
    newTask: {
        label: '',
        type: 'personal',
    } as TodoItem,

    taskItems: [] as TodoItem[],

    listFilter: 'all'
});

// Not really worth it, but ...
const {listFilter, taskItems, newTask  } = toRefs(state);

const filteredTasks = computed<TodoItem[]>(() => {
    if(state.listFilter === 'completed') {
        return state.taskItems.filter((item: TodoItem) => item.isComplete === true);
    } else if(state.listFilter === 'incomplete') {
        return state.taskItems.filter((item: TodoItem) => item.isComplete === false);
    } else {
        return state.taskItems;
    }
});

function addTask() {
    state.taskItems.push({
        ...state.newTask,
        isComplete: false
    });
};

</script>

<template>
    <p>
        {{ newTask }}
    </p>
</template>

<style scoped>

</style>
