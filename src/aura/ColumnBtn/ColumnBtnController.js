({
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
        cmp.set("v.cat", "");
        cmp.set("v.type", "");
        cmp.set("v.point", "");
        
    },
    openmodal:function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    
    //Pulls from Controller to get list of Categories to insert in module options
    doInit: function(cmp) {
        var action = cmp.get("c.getCat");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Category", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    },
    
    //What happens when a button is saved
    HandleIt : function(cmp, event, helper) {
        
        // Temporary fix to add the correct th into the datatable
        
        /*var table = document.getElementById("NewHeader").insertCell(1);
        var tr = document.createElement('tr');
        tr.class="slds-line-height_reset";
        table.appendChild(tr);
        var id = cmp.get("v.cat");
        var id2 = cmp.get("v.type");
        var id3 = cmp.get("v.point");
        var th = document.createElement("th")
        th.class="slds-text-title_caps" ;
        th.scope="col";
        var div = document.createElement("div")
        div.class="slds-truncate" ;
        div.innerHTML = id + " " + id2 + " " + id3 + '%';
        table.appendChild(th); 
        table.appendChild(div);
              
     
          console.log("hello world");*/
        
        
        
        var allValid = cmp.find('input').reduce(function (validSoFar, inputCmp) {
            return validSoFar && !inputCmp.get('v.validity').valueMissing;
        }, true);
        if (allValid) {
            //closes themodal
            //
            var cmpTarget = cmp.find('Modalbox');
            var cmpBack = cmp.find('Modalbackdrop');
            $A.util.removeClass(cmpBack,'slds-backdrop--open');
            $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
            
            
            var cmpTarget = cmp.find('Modalbox');
            var cmpBack = cmp.find('Modalbackdrop');
            $A.util.removeClass(cmpBack,'slds-backdrop--open');
            $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
            
            //Vobert's Code
            var assignment = cmp.get("v.Assessment");
            var week = cmp.get("v.week");
            var batch = cmp.get("v.batchID");            
            var point = cmp.get("v.point");
            var category = cmp.get("v.cat");
            var type = cmp.get("v.type");
            
            assignment.Id = null;
            assignment.Training_Id__c = batch;
            assignment.Week_Number__c = week;
            assignment.Max_Points__c = point;
            assignment.Assessment_Category__c = category;
            assignment.Assessment_Type__c = type;
            //console.log(JSON.stringify(assignment));
            //alerts batchTableRow that the event has been fired once btn been pressed i
            var saving = cmp.get("c.saving");
            
            saving.setParams({"Assignment": assignment});
            
            saving.setCallback(this,function(savingfunction){
                if(savingfunction.getState() === "SUCCESS"){
                    //console.log(savingfunction.getReturnValue());
                    var assessment = savingfunction.getReturnValue();
                    cmp.set('v.Assessment',assessment);
                    var associates = cmp.get('v.associates');
                    
                    helper.createGrades(cmp,assessment,associates);
                    
                    //console.log(JSON.stringify(assessment));
                }
            });
            $A.enqueueAction(saving);
            //console.log(saving);
        } else{ 
            alert('Please update the invalid form entries and try again.');
        }
        cmp.set("v.cat", "");
        cmp.set("v.type", "");
        cmp.set("v.point", "");
        
        
    },
    weekChange : function(component,event,helper){
        var week = event.getParam("week");
        component.set('v.week',week);
        
    },
    setAssociates : function(component,event,helper){
        var associates = event.getParam("associates");
        component.set('v.associates',associates);
    }
    
})