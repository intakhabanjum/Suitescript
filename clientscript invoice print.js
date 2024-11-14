/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(["N/record", "N/url", 'N/currentRecord', 'N/https', 'N/search'], function(record, url, currentRecord, https, search) {
   
    function pageInit() {

    }
    //------------------------------------------------------------  
    function invoice_print_work_order() {
      var current_rec = currentRecord.get();
       var recId = current_rec.id;
		var rec_type = current_rec.type;
		

        // Create a Suitelet URL with the current record ID as a parameter
        var suiteletURL = url.resolveScript({
            scriptId: "customscript_sut_worksorderprint_invoice",
		    deploymentId: "customdeploy_sut_worksorderprint_invoice",
            params: {
               custpage_recId: recId,
				custpage_recType:rec_type
            }
        });

        // Open the Suitelet URL in a new window
        window.open(suiteletURL, '_blank');

    

    }
	

    function invoice_print_tax_invoice() {
        var current_rec = currentRecord.get();
         var recId = current_rec.id;
          var rec_type = current_rec.type;
          
  
          // Create a Suitelet URL with the current record ID as a parameter
          var suiteletURL = url.resolveScript({
              scriptId: "customscript_sut_taxinvoice",
              deploymentId: "customdeploy_sut_taxinvoice",
              params: {
                 custpage_recId: recId,
                  custpage_recType:rec_type
              }
          });
  
          // Open the Suitelet URL in a new window
          window.open(suiteletURL, '_blank');
  
      
  
      }
	

    

    // }


    


    return {
        pageInit: pageInit,
        invoice_print_work_order: invoice_print_work_order,
        invoice_print_tax_invoice:invoice_print_tax_invoice
    };
});