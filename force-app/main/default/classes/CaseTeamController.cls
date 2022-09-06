public with sharing class CaseTeamController {
    @AuraEnabled(cacheable=true)
    public static List<CaseTeamMember> getCaseTeam(Id recordId) {
        List<CaseTeamMember> caseTeam = new List<CaseTeamMember>();

        try {
            caseTeam = [SELECT Id, MemberId, Member.Name, TeamRole.Name, TeamRole.AccessLevel FROM CaseTeamMember WHERE ParentId = :recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return caseTeam;
    }
}
