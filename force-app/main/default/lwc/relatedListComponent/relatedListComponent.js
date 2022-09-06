import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class RelatedListComponent extends LightningElement {
    @api parentRecordId;
    @api relatedListId;
    @api pageSizeLimit;
    error;
    records;
    fields;

    @wire(getRelatedListRecords, { parentRecordId: '$parentRecordId', relatedListId: '$relatedListId', pageSize: '$pageSizeLimit' })
    relatedInfo({ error, data }) {
        if (data) {
            this.records = data.records;
            this.fields = data.fields;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = undefined;
            this.fields = undefined;
        }
    }
}