              /**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
*/
define(['N/ui/serverWidget'],
    function(serverWidget) {
        function onRequest(context){
            if(context.request.method === 'GET'){
				              var form = serverWidget.createForm({
							title: 'Employee information'
						}); 
						
						  var usergroup = form.addFieldGroup({
							id : 'usergroup',
							label : 'User Information'
							
						});
						usergroup.isSingleColumn = true;

						var companygroup = form.addFieldGroup({
							id : 'companygroup',
							label : 'Company Information'
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
							 
							select.addSelectOption({
								value: 'Dr.',
								text: 'Dr.'
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
							// lname=.isMandatory = true;
										
							form.addField({
								id: 'emailfield',
								type: serverWidget.FieldType.EMAIL,
								label: 'Email',
								container: 'usergroup'
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
								container: 'companygroup'
							}); 

									
						
			     form.addSubmitButton({
					label: 'Submit'
				}); 

            

            



						
               context.response.writePage(form);
				
                // Section One - Forms - See "Steps for Creating a Form"  
                // Section Two - Tabs - See "Steps for Adding a Tab to a Form"  
                // Section Three - Sublist - See "Steps for Adding a Sublist to a Form"
            }else{
                // Section Four - Output - Used in all sections
            }
        }
     // Checking log Validation 	End ---------------
        return {
            onRequest: onRequest
        }
    });