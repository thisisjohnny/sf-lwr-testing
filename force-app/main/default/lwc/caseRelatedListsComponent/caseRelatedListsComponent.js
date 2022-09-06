import { LightningElement, api, wire } from 'lwc';
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';

export default class CaseRelatedListsComponent extends LightningElement {
    @api objectApiName;
    @api recordId;
    @api pageSizeLimit;
    relatedLists;
    error;
    showRelatedLists = true;
    
    @wire(getRelatedListsInfo, { parentObjectApiName: '$objectApiName'})
    listInfo({ error, data }) {
        if (data) {
            this.relatedLists = data.relatedLists;
            this.error = undefined;
            this.showRelatedLists = true;
        } else if (error) {
            this.error = error;
            this.relatedLists = undefined;
            this.showRelatedLists = false;
        }
    }
}