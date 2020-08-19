<template>
    <div class="container">
        <table class="table table-striped mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t) in todo" v-bind:key="t.todo_id">
                    <td>
                        {{t.description}}
                    </td>
                    <td>Edit</td>
                    <td><button class="btn btn-danger" v-on:click="deleteTodo(t.todo_id)">Del</button></td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    name: 'ListTodo',

    data() {
        return {
            todo: {}
        }
    },

    mounted() {
        this.getTodos()
    },

    methods: {
        async getTodos(){
            try {
                const response = await fetch('http://localhost:5000/todos', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })

                const jsonData = await response.json()
                this.todo = jsonData
                console.log(this.todo)

            } catch (error) {
                console.log(error.message)
            }
        },


        async deleteTodo(todoId){
            try {
                const respDelTodo = await fetch(`http://localhost:5000/todos/${todoId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })

                console.log(respDelTodo)

                if (respDelTodo.status === 200){
                    // console.log('200on bent')
                    this.todo = this.todo.filter(t => t.todo_id !== todoId)
                }
                
            } catch (error) {
                console.log(error.message)
            }
        }

    },
    
}
</script>


<style scoped>
    
</style>