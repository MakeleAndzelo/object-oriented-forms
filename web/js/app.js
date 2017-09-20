class Error
{
    constructor()
    {
        this.errors = {}
    }

    record(validationErrors)
    {
        this.errors = validationErrors;
    }

    get(key)
    {
        return this.errors[key].errors[0];
    }

    has(key)
    {
        return this.errors.hasOwnProperty(key);
    }

    clear(key)
    {
        delete this.errors[key];
    }
}

new Vue({
    el: '#app',
    data: {
        name: "",
        description: "",
        errors: new Error,
    },
    methods: {
        onSubmit()
        {
            axios.post('/posts', {
                name: this.name,
                description: this.description,
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    this.errors.record(error.response.data.children);
                })
        }
    }
})