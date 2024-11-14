
/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@NModuleScope Public
 */

 define(['N/config','N/format','N/record','N/url','N/runtime','N/http','N/search','N/ui/serverWidget'],
  function(config,format,record,url,runtime,http,search,serverWidget) {

    function beforeLoad(context) {
        try {
			var newRecord = context.newRecord;
			var recordId= newRecord.id;
			var recordType = newRecord.type;
			var typeOdMode = context.type
			
           if (typeOdMode == "view") {
                log.debug({title:'hi',details: 'hi'})
                var currentForm = context.form;
					var invoice_rec = record.load({
                        type: recordType, //Loading the record
                        id: recordId,
                        isDynamic: true
                    }); 
			  var customform = invoice_rec.getValue({
						fieldId:"customform" 
					});
					
					var class_ = invoice_rec.getValue({
						fieldId:"class"
					});

          if(customform == "144" && class_ == "7"){
            var currentForm = context.form;
                             currentForm.addButton({
                                 id: "custpage_tax_invoice",
                                 label: "Tax Invoice",
                                 functionName: "invoice_print_tax_invoice(" + recordId + ")"
                             });
                         }
            
			  
			   if(customform == "144" && class_ == "7"){
				   var currentForm = context.form;
                            currentForm.addButton({
                                id: "custpage_packing_list",
                                label: "Packing List",
                                functionName: "invoice_print_packing_list(" + recordId + ")"
                            });
                        }
           }

			  
			  

		
		
		  context.form.clientScriptModulePath = './CLI_Invoice Print.js ';  
		            // }
		}
        catch(e)
        {
          log.debug({title:'hi',details: e})
        }
    }
    return {
		beforeLoad: beforeLoad
    };
  });
