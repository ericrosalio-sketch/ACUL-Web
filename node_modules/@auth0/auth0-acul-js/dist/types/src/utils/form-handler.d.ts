import type { FormOptions } from '../../interfaces/utils/form-handler';
export declare class FormHandler {
    options: FormOptions;
    constructor(options: FormOptions);
    submitData<T>(payload: T): Promise<void>;
    private buildForm;
    private addTelemetryField;
}
//# sourceMappingURL=form-handler.d.ts.map