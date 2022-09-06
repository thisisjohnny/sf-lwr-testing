import { LightningElement, wire, api } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { NavigationMixin } from 'lightning/navigation';
import CASE_OBJECT from '@salesforce/schema/Case';

const actions = [
    { label: 'Navigate to Details', name: 'navigate_details' }
]

export default class CaseListViewComponent extends LightningElement {
    @api listViewApiName
    @api listViewReadableName
    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;
    records;
    record = {};
    columns;
    error;

    @wire(getListUi, { objectApiName: CASE_OBJECT, listViewApiName: '$listViewApiName', pageSize: 25, pageToken: '$pageToken' })
    listview({ error, data }) {
        if (data) {
            this.records = data.records.records;
            this.columns = data.records.fields;
            this.error = undefined;
            this.nextPageToken = data.records.nextPageToken;
            this.previousPageToken = data.records.previousPageToken;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    handleNextPage(event) {
        this.pageToken = this.nextPageToken;
    }

    handlePreviousPage(event) {
        this.pageToken = this.previousPageToken;
    }

    handleRowAction(event) {
        event.preventDefault();

        const row = event.detail.row;
        this.record = row;
        let recordId = this.record.Id;
        let objectApiName = this.CASE_OBJECT.objectApiName;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: objectApiName,
                actionName: 'view'
            }
        });
    }
}