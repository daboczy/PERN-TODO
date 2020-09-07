<template>
    <div class="container">
        <table class="table table-striped mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>|</th>
                    <th>Modal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t) in todo" v-bind:key="t.todo_id">
                    <td>
                        <input v-show="editing && t.todo_id == editID" type="text" class="form-control text-center" v-model="t.description"/>
                        <input v-show="!editing || editing && t.todo_id != editID" type="text" class="form-control text-center" disabled v-model="t.description"/>
                    </td>

                    <td>
                        <button v-show="!editing || editing && t.todo_id != editID" class="btn btn-primary" v-on:click="modifTodo(t.todo_id)">Edit</button>
                        <button v-show="editing && t.todo_id == editID" class="btn btn-warning" v-on:click="updTodo(t)">Save</button>
                    </td>
                    
                    <td><button class="btn btn-danger" v-on:click="deleteTodo(t.todo_id)">Del</button></td>


                    <td>|</td>
                    <td><EditTodo :todoProps="t" /></td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>


<script>
import EditTodo from './EditTodo'


export default {
    name: 'ListTodo',

    components: {
        EditTodo
    },

    data() {
        return {
            todo: {},
            editing: false, 
            editID: ''
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
                console.log('getTodos', this.todo)

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
        },


        modifTodo(data){
            this.editing = true
            this.editID = data
            console.log('modifyTodo', data) 
        },


        async updTodo(data){
            try {
                const respModifTodo = await fetch(`http://localhost:5000/todos/${data.todo_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })

                console.log(respModifTodo)

                window.location = '/'       //refresh the whole site 

            } catch (error) {
                console.log(error.message)
            } 
        },
    }

}

</script>


<style scoped>
    
</style>