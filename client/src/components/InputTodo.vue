<template>
    <div class="container">
        <h1 class="text-center mt-5">TodoList</h1>
        <form class="d-flex mt-5">
            <input type="text" class="form-control" v-model="todo.description">
            <button class="btn btn-success" v-on:keyup.enter="onSubmitForm()" v-on:click="onSubmitForm()" >Add</button>
        </form>  
    </div>
</template>


<script>
export default {
    name: 'InputTodo',

    data() {
        return {
            todo: {
                //send with "description" key
            }
        }
    },

    methods: {
        async onSubmitForm(){
            event.preventDefault();

            try {
                const response = await fetch('http://localhost:5000/todos', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.todo)
                })

                // console.log(JSON.stringify(this.todo))
                console.log(response)

                this.todo = {}
                // console.log(JSON.stringify(this.todo))
                // window.location = '/'       //refresh the whole site?                
            } catch (error) {
                console.log(error.message)
            }
        }
    },
    
}
</script>


<style scoped>
    
</style>