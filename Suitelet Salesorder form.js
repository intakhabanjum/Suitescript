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

                var companygroup = form.addFieldGroup({
                    id: 'companygroup',
                    label: 'Sales Information'
                });
                var select = form.addField({
                    id: 'formfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Form',
                    container: 'usergroup',
                    source: '1821'
                });
                // select.isMandatory = true;

                form.addField({
                    id: 'salesorderfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Sales Order #',
                    container: 'usergroup'
                });


                var cust = form.addField({
                    id: 'customerfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer',
                    container: 'usergroup'
                });
                cust.isMandatory = true;
                form.addField({
                    id: 'custpofield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'CUST PO Number',
                    container: 'usergroup'
                });

                var location = form.addField({
                    id: 'locfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'usergroup',
                    source: '1773'
                });

                var orderdate = form.addField({
                    id: 'orderdateid',
                    type: serverWidget.FieldType.DATE,
                    label: 'Order Date',
                    container: 'usergroup'
                });
                // orderdate.isMandatory = true;

                var select = form.addField({
                    id: 'genderfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Terms',
                    container: 'usergroup'

                });
                select.addSelectOption({
                    value: '01',
                    text: '1% 10 Net 30'
                });
                select.addSelectOption({
                    value: '02',
                    text: '2% 10 Net 30'
                });
                select.addSelectOption({
                    value: '03',
                    text: 'Due on receipt'
                });

                select.addSelectOption({
                    value: '04',
                    text: 'Net 15'
                });

                select.addSelectOption({
                    value: '05',
                    text: 'Net 30'
                });
                select.addSelectOption({
                    value: '06',
                    text: 'Net 60'
                });

                var classe = form.addField({
                    id: 'classfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Class',
                    container: 'usergroup'
                });
                classe.addSelectOption({
                    value: '01',
                    text: ''
                });
                classe.addSelectOption({
                    value: '02',
                    text: 'Australia'
                });
                classe.addSelectOption({
                    value: '03',
                    text: 'Corporate Sales'
                });

                classe.addSelectOption({
                    value: '04',
                    text: 'Equipment 01	'
                });

                classe.addSelectOption({
                    value: '05',
                    text: 'Equipment Rental'
                });
                classe.addSelectOption({
                    value: '06',
                    text: 'MEDICAL ASTHETICS'
                });
                classe.addSelectOption({
                    value: '07',
                    text: 'OPHTHALMOLOGY'
                });
                classe.addSelectOption({
                    value: '08',
                    text: 'Papaya Company'
                });
                classe.addSelectOption({
                    value: '09',
                    text: 'Production employee'
                });
                classe.addSelectOption({
                    value: '10',
                    text: 'Retail Store Business'
                });
                classe.addSelectOption({
                    value: '11',
                    text: 'Transportation'
                });
                classe.addSelectOption({
                    value: '12',
                    text: 'Others'
                });

                var depart = form.addField({
                    id: 'departfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'DEPARTMENT',
                    container: 'usergroup'
                });
                depart.addSelectOption({
                    value: '01',
                    text: ''
                });
                depart.addSelectOption({
                    value: '02',
                    text: 'Accounting'
                });
                depart.addSelectOption({
                    value: '03',
                    text: 'Admin'
                });

                depart.addSelectOption({
                    value: '04',
                    text: 'Admin01'
                });
                depart.addSelectOption({
                    value: '05',
                    text: '	Admin01 : Health 01'
                });
                depart.addSelectOption({
                    value: '06',
                    text: 'CHARIS- Admin'
                });
                depart.addSelectOption({
                    value: '06',
                    text: 'CHARIS- Admin'
                });
                depart.addSelectOption({
                    value: '07',
                    text: 'CHARIS- Finance'
                });
                depart.addSelectOption({
                    value: '09',
                    text: 'Default'
                });
                depart.addSelectOption({
                    value: '10',
                    text: 'Education'
                });
                depart.addSelectOption({
                    value: '11',
                    text: 'Marketing'
                });
                var Opportunity = form.addField({
                    id: 'opportunityfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Opportunity',
                    container: 'companygroup',
                    source: '1819'
                });

                var leadsorce = form.addField({
                    id: 'leadsorcefield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'LEAD SOURCE',
                    container: 'companygroup',
                    source: '583'
                });

                var status = form.addField({
                    id: 'statusfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'STATUS',
                    container: 'companygroup'
                });
                status.addSelectOption({
                    value: '01',
                    text: 'Pending Approval'
                });
                status.addSelectOption({
                    value: '02',
                    text: 'Pending Fulfillment'
                });

                status.isMandatory = true;


                form.addField({
                    id: 'startdatefield',
                    type: serverWidget.FieldType.DATE,
                    label: 'START DATES',
                    container: 'companygroup'
                });

                var amountinw = form.addField({
                    id: 'amountfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'AMOUNT IN WORDS',
                    container: 'companygroup'
                });
                amountinw.defaultValue = 'ERROR: Invalid Expression';

                var contactdur = form.addField({
                    id: 'contdurfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'CONTRACT DURATION',
                    container: 'companygroup'

                });
                contactdur.addSelectOption({
                    value: '01',
                    text: ''
                });
                contactdur.addSelectOption({
                    value: '01',
                    text: '12'
                });
                contactdur.addSelectOption({
                    value: '02',
                    text: '24'
                });

                var chinese = form.addField({
                    id: 'chinesefield',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'CHINESE CHARACTER',
                    container: 'companygroup'
                });
                chinese.defaultValue = 'ERROR: Invalid Expression';


                form.addField({
                    id: 'attentionfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'ATTENTION',
                    container: 'companygroup'
                });
                var enddate = form.addField({
                    id: 'enddatefield',
                    type: serverWidget.FieldType.DATE,
                    label: 'END DATE',
                    container: 'companygroup'
                });
                // enddate.isMandatory = true;
                form.addField({
                    id: 'todayfield',
                    type: serverWidget.FieldType.DATE,
                    label: 'TODAYS DATE',
                    container: 'companygroup'
                });

                var workflow = form.addField({
                    id: 'workflowfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'WORKFLOW STATUS',
                    container: 'companygroup'
                });
                workflow.addSelectOption({
                    value: '01',
                    text: 'Pending for Approval	'
                });
                workflow.addSelectOption({
                    value: '02',
                    text: 'Approved'
                });
                workflow.addSelectOption({
                    value: '03',
                    text: 'Rejected'
                });
                workflow.addSelectOption({
                    value: '04',
                    text: 'Hold'
                });
                workflow.addSelectOption({
                    value: '05',
                    text: 'Cancelled'
                });

                form.addField({
                    id: 'refbokfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'REF BOOKING SERVICE NO',
                    container: 'companygroup'
                });
                form.addField({
                    id: 'checkbox',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'TEST_CHECK',
                    container: 'companygroup'
                });
                var multiSelect = form.addField({
                    id: 'retrelfieldid',
                    type: serverWidget.FieldType.MULTISELECT,
                    label: 'REFERENCE TRAVEL RECORD ID',
                    container: 'companygroup'
                });
                multiSelect.addSelectOption({
                    value: '01',
                    text: ''
                });
                var salesrep = form.addField({
                    id: 'salesrepfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'SALES REPRASENTATIVE',
                    container: 'companygroup'
                });
                salesrep.addSelectOption({
                    value: '051',
                    text: ''
                });
                salesrep.addSelectOption({
                    value: '01',
                    text: '1 Nirmal N'
                });
                salesrep.addSelectOption({
                    value: '02',
                    text: '2 Nupura Pund'
                });
                salesrep.addSelectOption({
                    value: '03',
                    text: '3 Prasanna Venkatesh'
                });
                salesrep.addSelectOption({
                    value: '04',
                    text: '7 Krista Barton'
                });
                salesrep.addSelectOption({
                    value: '05',
                    text: '10 Joanna L Hammack'
                });
                salesrep.addSelectOption({
                    value: '06',
                    text: '11 Andy Andrews'
                });
                salesrep.addSelectOption({
                    value: '07',
                    text: '12 Kelly R Kallingal	'
                });
                salesrep.addSelectOption({
                    value: '08',
                    text: '29 Randy Unger'
                });
                salesrep.addSelectOption({
                    value: '019',
                    text: '31 George Phelps	'
                });
                form.addField({
                    id: 'quationfield',
                    type: serverWidget.FieldType.DATE,
                    label: 'QUOTATION VALIDIITY DATE',
                    container: 'companygroup'
                });
                var country = form.addField({
                    id: 'countryfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'COUNTRY',
                    container: 'companygroup',
                    source: '826'
                });

                var testso = form.addField({
                    id: 'testsofieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'TEST SO',
                    container: 'companygroup'
                });
                testso.addSelectOption({
                    value: '081',
                    text: ''
                });
                testso.addSelectOption({
                    value: '01',
                    text: 'B'
                });
                testso.addSelectOption({
                    value: '201',
                    text: 'N'
                });
                testso.addSelectOption({  
                    value: '301',
                    text: 'M'
                });
                testso.addSelectOption({   
                    value: '901',
                    text: 'Test'
                });
                // testso.isMandatory = true;
                var bodyfield = form.addField({   
                    id: 'bodybieldfieldid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'BODY FIELD ',
                    container: 'companygroup'
                });
                // bodyfield.isMandatory = true;
                var state = form.addField({
                    id: 'statefieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'STATE',
                    container: 'companygroup'
                });
                state.addSelectOption({
                    value: '081',
                    text: ''
                });
                state.addSelectOption({
                    value: '081',
                    text: 'ANDHRA PRADESH'
                });
                state.addSelectOption({
                    value: '01',
                    text: 'MAHARASHTRA'
                });
                state.addSelectOption({
                    value: '201',
                    text: 'UTTAR PRADESH'
                });
                var city = form.addField({
                    id: 'cityfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'City',
                    container: 'companygroup'
                });
                city.addSelectOption({
                    value: '081',
                    text: ''
                });
                city.addSelectOption({
                    value: '081',
                    text: 'HYDRABAD'
                });
                city.addSelectOption({
                    value: '01',
                    text: 'MUMBAI'
                });
                city.addSelectOption({
                    value: '201',
                    text: 'PUNE'
                });
                form.addSubmitButton({
                    label: 'Submit'
                });
                form.addField({
                    id: 'internalfieldid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'INTERNAL ID',
                    container: 'companygroup'
                });

                var multisel = form.addField({
                    id: 'multiselfieldid',
                    type: serverWidget.FieldType.MULTISELECT,
                    label: 'A-MULTIPLE',
                    container: 'companygroup'
                });
                multisel.addSelectOption({
                    value: '081',
                    text: ''
                });
                multisel.addSelectOption({
                    value: '081',
                    text: '1'
                });
                multisel.addSelectOption({
                    value: '01',
                    text: '2'
                });
                multisel.addSelectOption({
                    value: '201',
                    text: '3'
                });

                form.addField({
                    id: 'employeefieldid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'EMPLOYEE',
                    container: 'companygroup'
                });
                form.addField({
                    id: 'trackingnumfieldid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TRACKING NUMBER',
                    container: 'companygroup'
                });
                form.addButton({
                    id: 'Cancel',
                    label: 'Cancel'
                });
                form.addButton({
                    id: 'Cancel',
                    label: 'Auto Fill'
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
                    id: 'payment_history',
                    type: serverWidget.FieldType.LABEL,
                    label: 'Payment History - Coming Soon',
                    container: 'subtab1id'
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
                    label: 'Ite',
                    tab: 'tab2id'
                });
                sublist.isMandatory = true;

                var cureency = form.addField({
                    id: 'curencyfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'CURRENCY',
                    container: 'tab2id'
                });
                cureency.isMandatory = true;

                cureency.addSelectOption({
                    value: '01',
                    text: 'SGD'
                });
                cureency.addSelectOption({
                    value: '05',
                    text: 'British pound'
                });
                cureency.addSelectOption({
                    value: '06',
                    text: 'Canadian dollar	'
                });
                cureency.addSelectOption({
                    value: '096',
                    text: 'Euro'
                });
                cureency.addSelectOption({
                    value: '051',
                    text: 'INR'
                });
                cureency.addSelectOption({
                    value: '061',
                    text: 'USD'
                });

                var taxcredit = form.addField({
                    id: 'taxcridfield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TAX CREDIT',
                    container: 'tab2id'
                });
                taxcredit.defaultValue = '0.00';
                var exchage = form.addField({
                    id: 'exchagefield',
                    type: serverWidget.FieldType.TEXT,
                    label: 'EXCHANGE RATE',
                    container: 'tab2id'
                });
                exchage.defaultValue = '1.00';
                exchage.isMandatory = true;

                var custso = form.addField({
                    id: 'custsofield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'CST-SO-REVIEW',
                    container: 'tab2id'
                });
                custso.addSelectOption({
                    value: '01',
                    text: ''
                });
                custso.addSelectOption({
                    value: '05',
                    text: 'Description'
                });
                custso.addSelectOption({
                    value: '06',
                    text: 'Assembly'
                });
                custso.addSelectOption({
                    value: '096',
                    text: 'Discount'
                });
                custso.addSelectOption({
                    value: '051',
                    text: 'Download Item	'
                });
                custso.addSelectOption({
                    value: '061',
                    text: 'End of Item Group'
                });
                custso.addSelectOption({
                    value: '061',
                    text: 'Expense'
                });
                custso.addSelectOption({
                    value: '061',
                    text: 'Inventory Item	'
                });
                custso.addSelectOption({
                    value: '061',
                    text: 'Non-inventory Item'
                });
                custso.addSelectOption({
                    value: '061',
                    text: 'Other Charge	'
                });
                var discount = form.addField({
                    id: 'discounfield',
                    type: serverWidget.FieldType.SELECT,
                    label: 'DISCOUNT',
                    container: 'tab2id'
                });
                discount.addSelectOption({
                    value: '01',
                    text: ''
                });
                discount.addSelectOption({
                    value: '05',
                    text: '15 % discount item'
                });
                discount.addSelectOption({
                    value: '06',
                    text: 'Loyalty Redumption'
                });
                discount.addSelectOption({
                    value: '096',
                    text: 'Partner Discount	'
                });
                discount.addSelectOption({
                    value: '096',
                    text: 'Standard 25% Discount'
                });
                discount.addSelectOption({
                    value: '096',
                    text: 'Standard 10% Discount'
                });

                sublist.addButton({
                    id: 'addmulbutid',
                    label: 'Add Multiple'
                });
                sublist.addButton({
                    id: 'upsellid',
                    label: 'Upsell Items'
                });
                sublist.addButton({
                    id: 'clearallid',
                    label: 'Clear All Lines'
                });
                var item = sublist.addField({
                    id: 'itemfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'ITEM'
                });
                // item.isMandatory = true;

                item.addSelectOption({
                    value: '01',
                    text: ''
                });
                item.addSelectOption({
                    value: '02',
                    text: 'ATTA'
                });
                item.addSelectOption({
                    value: '025',
                    text: 'MAGGI'
                });
                item.addSelectOption({
                    value: '025',
                    text: 'BISCUIT'
                });
                item.addSelectOption({
                    value: '028',
                    text: 'COLDDRINK'
                });
                item.addSelectOption({
                    value: '025',
                    text: 'TOOTHPASTE'
                });
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

                var qty = sublist.addField({
                    id: 'upfieldid',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'QTY'
                });
                // qty.isMandatory = true;

                var pricelv = sublist.addField({
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


                var tax = sublist.addField({
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
                // tax.isMandatory = true;

                var tax2 = sublist.addField({
                    id: 'tax2fieldid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TAX'
                });
                // tax2.isMandatory = true;
                sublist.addField({
                    id: 'expeshipfieldid',
                    type: serverWidget.FieldType.DATE,
                    label: 'EXPECTED SHIP DATE'
                });

                var loc = sublist.addField({
                    id: 'loctionfieldid',
                    type: serverWidget.FieldType.SELECT,
                    label: 'LOCATION'
                });
                loc.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });
                loc.addSelectOption({
                    value: '051',
                    text: 'Nagpur'
                });
                loc.addSelectOption({
                    value: '082',
                    text: 'kolkata'
                });

                loc.addSelectOption({
                    value: '033',
                    text: 'Kanpur'
                });
                loc.addSelectOption({
                    value: '084',
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

                var request = context.request.parameters
                var formfield = request.formfield;
                var salesorderfield = request.salesorderfield;
                var customerfield = request.customerfield;
                var orderdateid = request.orderdateid;
                var enddatefield = request.enddatefield;
                var testsofieldid = request.testsofieldid;
                var bodybieldfieldid = request.bodybieldfieldid;
                var statusfield = request.statusfield;
                var custpofield = request.custpofield;

                log.debug('custpofield', custpofield)
           



                var linecount=context.request.getLineCount({
                    group: 'sublistid'
                });
                log.debug("linecount.", linecount)

                for (var i = 0; i < linecount; i++) {

                   var transInternalID= context.request.getSublistValue({
                        group: 'sublistid',
                        name: 'pricelvfieldid',
                        line: i
                    });
                    log.debug("transInternalID.", transInternalID)

                    var transqty= context.request.getSublistValue({
                        group: 'sublistid',
                        name: 'upfieldid',
                        line: i
                    }); 
                    log.debug("transqty.", transqty)
                  }

                  context.response.write({output:"<h1> Thank you for your data submition kindly go back <br/> <table > <tr> <td style='border-top:1px solid black; border-bottom:1px solid black;border-left:1px solid black ; border-right:1px solid black'> Click here </td> </tr> </table> </h1>"});




            }
        }
        return {
            onRequest: onRequest
        };
    });