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
                <tr v-for="(t) in todo" v-bind:key="t.id">
                    <td>
                        {{t.description}}
                    </td>
                    <td>Edit</td>
                    <td>Delete</td>
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
        }
    },
    
}
</script>


<style scoped>
    
</style>