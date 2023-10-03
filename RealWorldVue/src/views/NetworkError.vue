
import router from '../router';
<template>
    <div class="networkError">
        <h1>Uh-Oh!</h1>

        <h3>
            It looks like you're experience some network issues, please take a breath
            and <a href="#" @click="$router.go(-1)">click here</a> to try again
        </h3>
    </div>
</template>
