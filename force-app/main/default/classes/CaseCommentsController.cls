public with sharing class CaseCommentsController {
    @AuraEnabled(cacheable=true)
    public static List<CaseComment> getCaseComments(Id recordId){
        List<CaseComment> commentList = new List<CaseComment>();

        try {
            commentList = [SELECT Id, IsPublished, CreatedDate, CommentBody FROM CaseComment WHERE ParentId = :recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return commentList;
    }
}
