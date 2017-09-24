class Form
{
    constructor(data, errors)
    {
        this.originalData = data;

        for(let field in data){
            this[field] = data.field;
        }

        this.errors = errors;
        this.isLoading = false;
    }

    reset()
    {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    data()
    {
        let data = Object.assign({}, this);

        delete data.errors;
        delete data.originalData;
        delete data.isLoading;

        return data;
    }

    submit(method, uri)
    {
        this.isLoading = true;

        axios[method](uri, this.data())
            .then(response => this.onSuccess(response))
            .catch(error => this.onFail(error))
    }

    onSuccess(response)
    {
        alert(response.statusText);

        this.reset();
        this.isLoading = false;
    }

    onFail(error)
    {
        this.errors.record(error.response.data.children);
        this.isLoading = false;
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

        this.errors = {};
    }

    any()
    {
        for(let error in this.errors) {
            if(this.errors[error].hasOwnProperty('errors')) {
                if (this.errors[error].errors.length != 0) return true;
            }
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
        }, new Error())
    },
    methods: {
        onSubmit()
        {
            this.form.submit('post', '/posts');
        }
    }
})
