import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class RegisterPageForm {
    private formBuilder: FormBuilder
    emailRegex = '[a-z]+@[a-z]+.[a-z]{2,3}';
    emailRegex2 = '^[a-z0-9._%+-]{0,}+\@[a-z0-9.-]{0,}+\.[a-z]{2,4}+\.[a-z]{2,4}$'

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
            password: ['', [Validators.required]],
            confirmpassword: ['', [Validators.required]]
        });
    }
}