<template>
    <div class="container">
        <!-- Button to Open the Modal -->
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Edit {{todo.todo_id}}</button> -->
        <button type="button" class="btn btn-primary openBtn" v-on:click="showModal(todo)">Edit {{todo.todo_id}}</button>

        <!-- The Modal -->
        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Edit todo: {{todo.todo_id}} - {{todo.description}}</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <input type="text" class="form-control" v-model="todo.description"/>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal" v-on:click="modifyTodo(todo)">Edit</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery'


export default {
    //name: 'EditTodo',
    props: [
        'todoProps'
    ],

    data() {
        return {
            todo: {}
        }
    },

    mounted() {
        //this.todo.push(this.todoProps);
        //this.todo = JSON.stringify(this.todoProps)
        this.todo = this.todoProps
        console.log('mounted', this.todo.description, this.todo.todo_id)
    },

    methods: {
        showModal(pTodo){
            // event.preventDefault();
            console.log('showModal', pTodo) 
            //Object.values(this.todo).filter(t => t.todo_id === pTodo.todo_id)
            //Object.values(this.todo)[data.todo_id]
            $('.modal-body input').val(this.todo.description)
            $('#myModal').modal({show:true});
        },

        async modifyTodo(pTodo){
            console.log('modifyTodo', pTodo) 
            try {
                const respModifTodo = await fetch(`http://localhost:5000/todos/${pTodo.todo_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pTodo)
                })

                console.log(respModifTodo)

                //window.location = '/'       //refresh the whole site 

            } catch (error) {
                console.log(error.message)
            }           
        }

    },

    
}
</script>


<style scoped>
    
</style>