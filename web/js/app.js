class Form
{
    constructor(data)
    {
        this.originalData = data;

        for(let field in data){
            this[field] = data.field;
        }

        this.errors = new Error();
    }

    reset()
    {

    }

    data()
    {

    }

    submit(method, uri)
    {
        axios[method](uri, this.data())
            .then(response => this.onSuccess(response))
            .catch(error => this.onFail(error))
    }

    onSuccess(response)
    {

    }

    onFail(error)
    {

    }
}

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
        if(this.errors[key].errors) {
            return this.errors[key].errors[0];
        }
    }

    has(key)
    {
        if(!this.errors.hasOwnProperty(key)) {
            return false;
        }

        return this.errors[key].hasOwnProperty('errors');
    }

    clear(key)
    {
        if(key) {
            delete this.errors[key];
            return;
        }

        delete this.errors;
    }

    any()
    {
        for(let error in this.errors) {
            if (error.length != 0) return true;
        }

        return false;
    }
}

new Vue({
    el: '#app',
    data: {
        form: new Form({
            name: "",
            description: "",
        }),
    },
    methods: {
        onSubmit()
        {
            this.form.submit('post', '/posts');
        }
    }
})