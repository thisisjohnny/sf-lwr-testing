import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CASE_CONTACT_ID from '@salesforce/schema/Case.ContactId';
import CASE_CONTACT_NAME from '@salesforce/schema/Case.Contact.Name';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';

export default class CaseContactViewComponent extends LightningElement {
    fields = [CONTACT_NAME, CONTACT_EMAIL, CONTACT_PHONE];

    @api recordId;
    @api objectApiName;
    contactId;
    error = null;
    showContact = true;

    @wire(getRecord, { recordId: '$recordId', fields: [CASE_CONTACT_ID, CASE_CONTACT_NAME] })
    case({ error, data }) {
        if (data) {
            this.contactId = data.fields.ContactId.value;
        } else if (error) {
            this.error = error;
            this.showContact = false;
        }
    }
}