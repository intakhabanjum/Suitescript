/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet 
 */
define(['N/ui/serverWidget' , 'N/record'],
    function(serverWidget, record ) {
        function onRequest(context) {
            if (context.request.method === 'GET') {   


                var form = serverWidget.createForm({
                    title: 'Employee Information '
                });

                var usergroup = form.addFieldGroup({
                    id: 'usergroup',
                    label: 'Primary Information'

                });
                //usergroup.isSingleColumn = true;



                form.addField({
                    id: 'employeename',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name',  
                    container: 'usergroup'
                });


                var cust = form.addField({
                    id: 'employeeid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Employee ID',
                    container: 'usergroup'
                });
                cust.isMandatory = true;

                form.addField({
                    id: 'employeeemial',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Email ',
                    container: 'usergroup'
                });

                form.addField({
                    id: 'employeecompany',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Company',
                    container: 'usergroup'
                });

                form.addSubmitButton({
                    label: 'Submit'
                });

          


                context.response.writePage(form);

            } else {

                var request = context.request.parameters
                var formfield = request.employeename;
                var salesorderfield = request.employeeid;
                var customerfield = request.employeeemial;
                var orderdateid = request.employeecompany;

                log.debug('formfield', formfield)
                log.debug('salesorderfield', salesorderfield)
                log.debug('customerfield', customerfield)
                log.debug('orderdateid', orderdateid)

                var rec = record.create({
                    type: 'customrecord_new_employee_information',
                    isDynamic : true
                });
        
                rec.setValue({  
                    fieldId: 'name',  
                    value:  formfield
                });   

                rec.setValue({
                    fieldId: 'custrecord_phone_number',
                    value: salesorderfield
                });
                rec.setValue({
                    fieldId: 'custrecord_email_addrss',
                    value: customerfield
                });
                rec.setValue({
                    fieldId: 'custrecordcompany_id',
                    value: orderdateid
                });

                // try {
                    var callId = rec.save();
                        log.debug('Call record created successfully', 'Id: ' + callId);
                    // } catch (e) {
                    //     log.debug('sigh');
                    //     log.error(e.name);
                    // }
        
            
                  context.response.write({output:"<b> Thank you for your submition kindly go back <br/> <table > <tr> <td style='border-top:1px solid black; border-bottom:1px solid black;border-left:1px solid black ; border-right:1px solid black'> Click here </td> </tr> </table> </b>"});

            }
        }
        return {
            onRequest: onRequest
        };
    });