import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class MpesaPageForm {
    private formBuilder: FormBuilder;
    phoneRegex = '[0-9]{10}';

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
        });
    }
}