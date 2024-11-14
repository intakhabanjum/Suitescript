/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    function(serverWidget) {
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
        
                var select = form.addField({
                    id: 'nameid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name',
                    container: 'usergroup',  
                });
                // select.isMandatory = true;

                form.addField({
                    id: 'employeeid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Employee ID',  
                    container: 'usergroup'
                });


                var cust = form.addField({
                    id: 'emailid',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Emial',
                    container: 'usergroup'
                });
                cust.isMandatory = true;

                form.addField({
                    id: 'companyid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Company Name',
                    container: 'usergroup'
                });

                context.response.writePage(form);

            } else {



                var request = context.request.parameters
                var name = request.nameid;
                var employee = request.employeeid;
                var email = request.emailid;
                var company = request.companyid;



                log.debug('name', name)
                log.debug('employee', employee)
                log.debug('email', email)
                log.debug('company', company)
          
           

                  

                  context.response.write({output:"<h1> Thank you for your data submition kindly go back <br/> <table > <tr> <td style='border-top:1px solid black; border-bottom:1px solid black;border-left:1px solid black ; border-right:1px solid black'> Click here </td> </tr> </table> </h1>"});

            }
        }
        return {
            onRequest: onRequest
        };
    });