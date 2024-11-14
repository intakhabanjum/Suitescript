/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define([ 'N/record' ,'N/currentRecord', 'N/config', 'N/format', 'N/record', 'N/url', 'N/runtime', 'N/http', 'N/search', 'N/ui/serverWidget' ], function(record,currentRecord, config, format, record, url, runtime, http, search, serverWidget) {
    function afterSubmit (context) {
        // Use a string internal ID to identify the custom record type.

        		var newRecord = context.newRecord; //return record obj
                var recordType = newRecord.type; //return record type
                var recordId = newRecord.id;	//return record id

                log.debug('recordType', recordType); 
                log.debug('recordId', recordId); 
             
                

        var rec = record.create({  
            type: 'customrecord_new_employee_information',
            isDynamic : true  
        }); 
        log.debug(rec);     

        var employeename = newRecord.getValue({   
            fieldId: 'altname'   

        });      
        var companyname = newRecord.getValue({   
            fieldId: 'companyname'   

        });   
        var emailaddress = newRecord.getValue({   
            fieldId: 'email'   

        });   
        var employeeid = newRecord.getValue({   
            fieldId: 'custentity_indgst_customer_legal_name'   
        });   


        rec.setValue({     
            fieldId: 'name',  
            value:  employeename 
        });   

        rec.setValue({
            fieldId: 'custrecordcompany_id',
            value: companyname
        });
        rec.setValue({
            fieldId: 'custrecord_email_addrss',
            value: emailaddress
        });

        rec.setValue({
            fieldId: 'custrecord_phone_number',
            value: employeeid
        });

        // try {
            var callId = rec.save();
                log.debug('Call record created successfully', 'Id: ' + callId);
            // } catch (e) {
            //     log.debug('sigh');
            //     log.error(e.name);
            // }
        }
        return {
            afterSubmit: afterSubmit
        };
});


