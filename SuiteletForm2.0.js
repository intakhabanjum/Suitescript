/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], 
function(serverWidget) {   
    function onRequest(context) {
        if (context.request.method === 'GET') {

           
            var form = serverWidget.createForm({
                title: 'NVT-ANKIT VERMA Suitelet 2.0'
            }); 

            var usergroup = form.addFieldGroup({
                id: 'usergroup',
                label: 'User Information'
				
            });
           //usergroup.isSingleColumn = true;

            var companygroup = form.addFieldGroup({
                id: 'companygroup',
                label: 'Company Information'
            });

            var select = form.addField({
                id: 'titlefield',
                type: serverWidget.FieldType.SELECT,
                label: 'Title',
                container: 'usergroup'
            });
            select.addSelectOption({
                value: 'Mr.',
                text: 'Mr.'
            });
            select.addSelectOption({
                value: 'MS.',
                text: 'Ms.'
            });
            var fname = form.addField({
                id: 'fnamefield',
                type: serverWidget.FieldType.TEXT,
                label: 'First Name',
                container: 'usergroup'
            });
            fname.isMandatory = true;

            var lname = form.addField({
                id: 'lnamefield',
                type: serverWidget.FieldType.TEXT,
                label: 'Last Name',
                container: 'usergroup'
            });
            lname.isMandatory = true;

            form.addField({
                id: 'emailfield',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email',
                container: 'usergroup'
            });
 
              form.addField({
                id: 'date',
                type: serverWidget.FieldType.DATE,
                label: 'Date',
                container: 'usergroup'
            });
			  form.addField({
                id: 'age',
                type: serverWidget.FieldType.INTEGER,
                label: 'Age',
                container: 'usergroup'
            });
			
			 form.addField({
                id: 'comment',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Comment',
                container: 'usergroup'
            });
			form.addField({
                id: 'percent',
                type: serverWidget.FieldType.PERCENT,
                label: 'Percentage',
                container: 'usergroup'
            });
			
			form.addField({
                id: 'currency',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Currency',
                container: 'usergroup'
            });
			 
			 	form.addField({
                id: 'checkbox',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Sales Person ',
                container: 'usergroup'
            });
			
			form.addField({
                id: 'checkbox1',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Local Person  ',
                container: 'usergroup'
            });
			
			form.addField({
                id: 'checkbox2',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Production ',
                container: 'usergroup'
            });
			 var select = form.addField({
                id: 'employee',
                type: serverWidget.FieldType.SELECT,
                label: 'Employee', 
                container: 'usergroup',	
                source:	'826'			
            });
			 
			 var multiSelect = form.addField({
                id: 'branch',
                type: serverWidget.FieldType.MULTISELECT,
                label: 'Branch', 
                container: 'usergroup'
			 });
			 multiSelect.addSelectOption({
                value: '01',
                text: ''
            });
			multiSelect.addSelectOption({
                value: '02',
                text: 'Computer Engineering'
            });
			multiSelect.addSelectOption({
                value: '03',
                text: 'Electronics Engineering'
            });
			
			multiSelect.addSelectOption({
                value: '04',
                text: 'Mechanical Engineering'
            });
			multiSelect.addSelectOption({
                value: '05',
                text: 'Aeronautical Engineering'
            });
			multiSelect.addSelectOption({
                value: '06',
                text: 'Agricultural Engineering'
            });
			
			
			form.addField({
                id: 'fromdateid',
                type: serverWidget.FieldType.DATE,
                label: 'From Date',
                container: 'usergroup'
            });
			
			form.addField({
                id: 'todateid',
                type: serverWidget.FieldType.DATE,
                label: 'To Date',
                container: 'usergroup'
            });
			
			form.addField({
                id: 'timeofdayid',
                type: serverWidget.FieldType.TIMEOFDAY,
                label: 'TimeofDay',
                container: 'usergroup'
            });
     
           form.addField({
            id: 'rdoproductrating',
            type: serverWidget.FieldType.LABEL,
            label: 'Which City is Good For You ',
			container: 'usergroup'
        }) .updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
	        form.addField({
            id: 'rdoproductrating',
            type: serverWidget.FieldType.RADIO,
            label: 'Pune',
            source: 'p1',
			container: 'usergroup'
        }) .updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
	 
	    form.addField({
            id: 'rdoproductrating1',
            type: serverWidget.FieldType.RADIO,
            label: 'Bangalore',
            source: 'p2',
			container: 'usergroup'
        }) .updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
		
		form.addField({
            id: 'rdoproductrating1',
            type: serverWidget.FieldType.RADIO,
            label: 'Kanpur',
            source: 'p3',
			container: 'usergroup'
        }) .updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
		
		form.addField({
            id: 'rdoproductrating1',
            type: serverWidget.FieldType.RADIO,
            label: 'Mumbai',
            source: 'p4',
			container: 'usergroup'
        }) .updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
		
		        form.addField({
    			id: 'fieldfileid',
    			type: serverWidget.FieldType.FILE,
    			label: 'Upload File1',
				//container:'usergroup'
				});
				
				form.addField({
    			id: 'fieldfileid1',
    			type: serverWidget.FieldType.FILE,
    			label: 'Upload File2',
				//container:'usergroup'
				});
		        form.addField({
    			id: 'fieldfileid2',
    			type: serverWidget.FieldType.FILE,
    			label: 'Upload File3',
				//container:'usergroup'
				});
		
		var select = form.addField({
                id: 'genderfieldid',
                type: serverWidget.FieldType.SELECT,
                label: 'Gender', 
                container: 'usergroup'				
            });
			 select.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.STARTROW
            });
        
	        	select.addSelectOption({
                value: '01',
                text: ''
            });
			select.addSelectOption({
                value: '02',
                text: 'Male'
            });
			select.addSelectOption({
                value: '03',
                text: 'Female'
            });
			
            var companyname = form.addField({
                id: 'companyfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Company',
                container: 'companygroup'
            });
            companyname.defaultValue = 'Company Name';

            form.addField({
                id: 'phonefield',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone Number',
                container: 'companygroup'
            });

            form.addField({
                id: 'urlfield',
                type: serverWidget.FieldType.URL,
                label: 'Website',
                container:'companygroup'
            });

            
            form.addSubmitButton({
                label: 'Submit'
            });
			form.addButton({
				id: 'action',
                label: 'Action'
            });
            form.addButton({
				id: 'edit',
                label: 'Edit'
            });
			form.addButton({
				id: 'save',
                label: 'Save'
            });
			form.addButton({
				id: 'exit',
                label: 'Exit'
            });
            var tab1 = form.addTab({
                id: 'tab1id',
                label: 'Payment'
            });
            tab1.helpText = 'Help Text Goes Here';

            var tab2 = form.addTab({
                id: 'tab2id',
                label: 'Items'
            });

            form.addSubtab({
                id: 'subtab1id',
                label: 'Payment Information',
                tab: 'tab1id'
            });

            form.addSubtab({
                id: 'subtab2id',
                label: 'Transaction Record',
                tab: 'tab1id'
            });
			
               form.addField({
                id: 'transactionfield',
                type: serverWidget.FieldType.LABEL,
                label: 'Transaction History - Coming Soon',
                container: 'subtab2id'
            });

              var sublist = form.addSublist({
                id: 'sublistid',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Inline Sublist',
                tab: 'tab2id'
            });
            
          
           var item= sublist.addField({
                id: 'itemfieldid',
                type: serverWidget.FieldType.TEXT,
                label: 'ITEM'
            });
			item.isMandatory = true;

            sublist.addField({
                id: 'descriptionfieldid',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'DESCRIPTION'
            });

            sublist.addField({
                id: 'availfieldid',
                type: serverWidget.FieldType.INTEGER,
                label: 'AVAIL'
            });

             var qty=sublist.addField({
                id: 'upfieldid',
                type: serverWidget.FieldType.INTEGER,
                label: 'QTY'
            });
			      qty.isMandatory = true;
           
		    var pricelv=sublist.addField({
                id: 'pricelvfieldid',	
                type: serverWidget.FieldType.SELECT,
                label: 'PRICE LEVEL'
            });
			pricelv.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.STARTROW
            });
			pricelv.addSelectOption({
                value: '01',
                text: 'Custom'
				 });
			
			 sublist.addField({
                id: 'pricefieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'PRICE '
            });
			
			 sublist.addField({
                id: 'amountfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'AMOUNT '
            });
			
			sublist.addField({
                id: 'fullfilledfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'FULFILLED '
            });
			
			sublist.addField({
                id: 'invoicedfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'INVOICED '
            });
			
			
			var tax= sublist.addField({
                id: 'taxcodefieldid',	
                type: serverWidget.FieldType.SELECT,
                label: 'TAX CODE '
            });
			tax.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.STARTROW
            });
			
			tax.addSelectOption({
                value: '01',
                text: '-Not Taxable-'
            });
			tax.addSelectOption({
                value: '02',
                text: 'GST-IND@18%'
            });
			
			tax.addSelectOption({
                value: '03',
                text: 'IGST-IND 18%'     
            });
			
			tax.addSelectOption({
                value: '04',
                text: ' GST 7%'
				 });
			tax.addSelectOption({
                value: '05',
                text: ' CGST(9%)&SGST(9%)-MU'
				 });	 
			
            tax.addSelectOption({
                value: '06',
                text: ' CGST (9%) & SGST (9%)-BG'
				 });		
            tax.isMandatory = true;		

             var tax2= sublist.addField({
                id: 'tax2fieldid',	
                type: serverWidget.FieldType.TEXT,
                label: 'TAX'
            });	 
           tax2.isMandatory = true;
            sublist.addField({           
                id: 'expeshipfieldid',	
                type: serverWidget.FieldType.DATE,
                label: 'EXPECTED SHIP DATE'
            });
			
			var loc=sublist.addField({           
                id: 'locfieldid',	
                type: serverWidget.FieldType.SELECT,
                label: 'LOCATION'
            });
			loc.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.STARTROW
            });
			loc.addSelectOption({
                value: '01',
                text: 'Nagpur'
            });
			loc.addSelectOption({
                value: '02',
                text: 'kolkata'
            });
			
			loc.addSelectOption({
                value: '03',
                text: 'Kanpur'
            });
			loc.addSelectOption({
                value: '04',
                text: 'Lucknow'
            });
			
			 sublist.addField({           
                id: 'expratefieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'EXCHANGE RATE'
            });
			
			 sublist.addField({           
                id: 'projectfieldid',	
                type: serverWidget.FieldType.TEXT,
                label: 'PROJECT ITEM'
            });
			

			 sublist.addField({           
                id: 'billfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'BILLABLE ESTIMATE'
            });
			 sublist.addField({           
                id: 'batchfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'BATCH NO'
            });
			
			sublist.addField({           
                id: 'nameofpatfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'NAME OF PATIENT'
            });
			
			sublist.addField({           
                id: 'paymentfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'PAYMENT DETAIL ID'
            });
			
			sublist.addField({           
                id: 'salesfieldid',	
                type: serverWidget.FieldType.INTEGER,
                label: 'SALESFORCE ORDER LINE ID (IO)'
            });
            context.response.writePage(form);
        } else {
            
            var delimiter = /\u0001/;
            var titleField = context.request.parameters.titlefield;
            var fnameField = context.request.parameters.fnamefield;
            var lnameField = context.request.parameters.lnamefield;
            var emailField = context.request.parameters.emailfield;
            var companyField = context.request.parameters.companyfield;
            var phoneField = context.request.parameters.phonefield;
            var urlField = context.request.parameters.urlfield;
            var ccField = context.request.parameters.cctypefield;
            var ccNumber = context.request.parameters.credfield;
            var expMonth = context.request.parameters.expmonth;
            var expYear = context.request.parameters.expyear;

            context.response.write('You have entered:'
                + '<br/>  Name: '+ titleField + ' ' + fnameField + ' ' + lnameField
                + '<br/>  Email: ' + emailField
                + '<br/>  Company: ' + companyField
                + '<br/>  Phone: ' + phoneField + ' Website: ' + urlField
                + '<br/>  Credit Card: ' + ccField
                + '<br/>  Number: '+ ccNumber
                + '<br/>  Expiry Date: ' + expMonth + '/' + expYear);
        }
    }
    return {
        onRequest: onRequest
    };
});