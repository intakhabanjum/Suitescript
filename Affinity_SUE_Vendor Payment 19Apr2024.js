/*----------------------------------------------------------------------------------------------
Company Name 	:	Nuvista Technologies Pvt Ltd
Script Name 	:	Suitelet_Vendor-Salary_Payment
Author 			:  	NVT Employee
Date            :   
Description		:   The purpose of the script Create form for vendor payment and set the data line level data from saved Search
------------------------------------------------------------------------------------------------*/

/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/config', 'N/ui/serverWidget', 'N/runtime', 'N/format', 'N/search', 'N/file', 'N/encode', 'N/record', 'N/currentRecord', 'N/redirect'],
    function(config, serverWidget, runtime, format, search, file, encode, record, currentRecord, redirect) {
        function onRequest(context) {
            try {

                if (context.request.method === 'GET') {
                    var getRecType = context.request.parameters.custpage_recType;
                    var getRecId = context.request.parameters.custpage_recId;
                    var currentRecord = context.currentRecord;
                    var recordId = context.request.parameters.recordId;
                    // log.debug("recordId", recordId)
                    var bankaccnt = context.request.parameters.bankaccnt;
                    // log.debug("bankaccnt", bankaccnt)
                    var newdate = new Date();
                    // load user preferences
                    var Setpreference = config.load({
                        type: config.Type.USER_PREFERENCES
                    });
                    var form = serverWidget.createForm({
                        title: 'Vendor Payment',
                    });
                    var group1 = form.addFieldGroup({
                        id: 'myfieldgroup1',
                        label: 'Search Filters',
                        isSingleColumn: false
                    });
                    var Bank_OBJ = form.addField({
                        id: "custpage_bankaccount",
                        type: serverWidget.FieldType.SELECT,
                        label: "Bank Account",
                        source: "426",
                        container: "myfieldgroup1"
                    });
                    Bank_OBJ.isMandatory = true;
                    if (bankaccnt) {
                        Bank_OBJ.defaultValue = bankaccnt;
                    }
                    // var group2 = form.addFieldGroup({
                    //     id: 'myfieldgroup2',
                    //     label: 'Payment Information',
                    //     singleColumn: false
                    // });

                    var Dateofprocess = form.addField({
                        id: 'custpage_dateofprocess',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date of Process ',
                        container: 'myfieldgroup1'
                    });
                    Dateofprocess.isMandatory = true;
                    // var group3 = form.addFieldGroup({
                    //     id: 'myfieldgroup3',
                    //     label: 'Classification',
                    //     singleColumn: false
                    // });

                    // var adviceText = form.addField({
                    //     id: 'custpage_eft_advice_text',
                    //     type: serverWidget.FieldType.TEXTAREA,
                    //     label: 'Advice Text',
                    //     container: 'myfieldgroup3',
                    //     maxLength: 2000 // set the maximum length to 2000 characters
                    // });

                    // adviceText.updateDisplaySize({
                    //     height: 5,
                    //     width: 25,
                    // });
                    // var narration_d = form.addField({
                    //     id: 'custpage_narration_d',
                    //     type: serverWidget.FieldType.TEXT,
                    //     label: 'Debit Narration',
                    //     container: 'myfieldgroup3'
                    // });

                    // var narration_c = form.addField({
                    //     id: 'custpage_narration_c',
                    //     type: serverWidget.FieldType.TEXT,
                    //     label: 'Credit Narration',
                    //     container: 'myfieldgroup3'
                    // });

                    // var No_Of_Tran_OBJ = form.addField({
                    //     id: 'custpage_no_tran',
                    //     type: serverWidget.FieldType.TEXT,
                    //     label: 'Number Of Transaction',
                    //     container: 'myfieldgroup3'
                    // });
                    // No_Of_Tran_OBJ.updateDisplaySize({
                    //     height: 15,
                    //     width: 15,
                    // });
                    // No_Of_Tran_OBJ.updateDisplayType({
                    //     displayType: serverWidget.FieldDisplayType.DISABLED,
                    // });

                    // var Total_Payment_Amount_OBJ = form.addField({
                    //     id: 'custpage_totalpaymentamount',
                    //     type: serverWidget.FieldType.TEXT,
                    //     label: 'Total Payment Amount',
                    //     container: 'myfieldgroup3'
                    // });
                    // Total_Payment_Amount_OBJ.updateDisplaySize({
                    //     height: 15,
                    //     width: 15,
                    // });
                    // Total_Payment_Amount_OBJ.updateDisplayType({
                    //     displayType: serverWidget.FieldDisplayType.DISABLED,
                    // });

                    // add sub tab
                    var subTab = form.addSubtab({
                        id: 'custpage_sublist_tab',
                        label: 'Payee List'
                    });

                    // add select all checkbox field to the sub tab
                    var check_box = form.addField({
                        id: 'custpage_tab_checkbox',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'Select All',
                        container: 'custpage_sublist_tab'
                    });

                    // add sub list to the sub tab
                    var subListPayObj = form.addSublist({
                        id: 'custpage_pay_list',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Payee List',
                        tab: 'custpage_sublist_tab'
                    });
                    // add fields to the sub list
                    var pay = subListPayObj.addField({
                        id: 'custpage_pay_checkbox',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'Pay'
                    });

                    subListPayObj.addField({
                        id: 'custpage_billing_date',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Billing Date'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_debit_acno',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Debit Ac No'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_beneficaiary_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Beneficiary Name'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_amt',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Amt'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_partial_amt',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Partial Amt'
                    });
                    subListPayObj.addField({
                        id: 'custpage_beneficaiary_ac',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Beneficiary Ac No'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_ifsc',
                        type: serverWidget.FieldType.TEXT,
                        label: 'IFSC'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_debit_nat',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Debit Narration'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_credit_nat',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Credit Narration'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_bene_mob',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Mobile No'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_bene_email',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Email id'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_bene_add',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Address'
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });
                    subListPayObj.addField({
                        id: 'custpage_sub',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Subsidiary '
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_vend_bill',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Ref Vendor Bill '
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED
                    });

                    subListPayObj.addField({
                        id: 'custpage_type',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Bill Type '
                    }).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN
                    });
                    if (nullCheck(bankaccnt)) {
                        var account_num = record.load({
                            type: 'customrecord_pls_companybankdetails', //Loading the record
                            id: bankaccnt,
                            isDynamic: true
                        });
                        var _acctnum = account_num.getValue({
                            fieldId: 'custrecord_pls_compbank_compaccnumber'
                        });
                    }
                    if (nullCheck(bankaccnt)) {
                        var fieldLookUp = search.lookupFields({
                            type: 'customrecord_pls_companybankdetails',
                            id: bankaccnt,
                            columns: ['custrecord_pls_compbankdet_compaccnumber']
                        });
                        log.debug("fieldLookUp", fieldLookUp)

                        var bank_subsidiary = fieldLookUp.custrecord_pls_compbankdet_compaccnumber[0]["value"];
                        log.debug("bank_subsidiary", bank_subsidiary)
                    }
                    // log.debug("_acctnum", _acctnum);

                    var ifsc_num = record.load({
                        type: 'vendor', //Loading the record
                        id: 5191,
                        isDynamic: true
                    });
                    var _ifscnum = ifsc_num.getValue({
                        fieldId: 'custentity_ifsc_code_vendor_mast'
                    });
                    // log.debug("_ifscnum", _ifscnum);
                    if (nullCheck(bank_subsidiary)) {
                        var set_linevalue2 = setline_itemValue2(bank_subsidiary);
                        if (set_linevalue2) {
                            for (var index = 0; index < set_linevalue2.length; index++) {
                                var _beneficialname = set_linevalue2[index].beneficial_name;
                                // log.debug("beneficial_name", _beneficialname)
                                var _amt = set_linevalue2[index].vendor_amt;
                                // log.debug("vendor_amt", _amt)
                                var _beneficialaccount = set_linevalue2[index].beneficial_account;
                                //log.debug("beneficial_account", _beneficialaccount)
                                var _beneficialaccount = set_linevalue2[index].beneficial_account;
                                //log.debug("beneficial_account", _beneficialaccount)
                                var _ifsccode = set_linevalue2[index].ifsc_code;
                                //log.debug("ifsc_code", _ifsccode)
                                var _address = set_linevalue2[index].bene_address;
                                //log.debug("bene_address", _address) 
                                var _mobile = set_linevalue2[index].bene_mobile;
                                //log.debug("bene_mobile", _mobile) 
                                var _email = set_linevalue2[index].bene_email;
                                //log.debug("bene_email", _email)
                                var _date = set_linevalue2[index].bene_date;
                                //log.debug("bene_date", _date)
                                var _debitacct = set_linevalue2[index].debit_acct;
                                //log.debug("debit_acct", _debitacct) 
                                var _bankname = set_linevalue2[index].bank_name;
                                // log.debug("bank_name", _bankname)
                                var _subsidiary = set_linevalue2[index].subsidiary_;
                                // log.debug("_subsidiary", _subsidiary)
                                var _vend_bill = set_linevalue2[index].vend_bill;
                                var _type = set_linevalue2[index].type_;
                                var _internal_id = set_linevalue2[index].internal_id_;
                                // log.debug("_type", _type)
                                if (nullCheck(_beneficialname)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_beneficaiary_name',
                                        line: index,
                                        value: _beneficialname
                                    });
                                }
                                if (nullCheck(_beneficialname)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_debit_nat',
                                        line: index,
                                        value: _beneficialname
                                    });
                                }
                                if (nullCheck(_beneficialname)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_credit_nat',
                                        line: index,
                                        value: _beneficialname
                                    });
                                }
                                if (nullCheck(_amt)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_amt',
                                        line: index,
                                        value: _amt
                                    });
                                }
                                if (nullCheck(_beneficialaccount)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_beneficaiary_ac',
                                        line: index,
                                        value: _beneficialaccount
                                    });
                                }
                                if (nullCheck(_ifsccode)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_ifsc',
                                        line: index,
                                        value: _ifsccode
                                    });
                                }
                                if (nullCheck(_address)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_bene_add',
                                        line: index,
                                        value: _address
                                    });
                                }
                                if (nullCheck(_mobile)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_bene_mob',
                                        line: index,
                                        value: _mobile
                                    });
                                }
                                if (nullCheck(_email)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_bene_email',
                                        line: index,
                                        value: _email
                                    });
                                }
                                if (nullCheck(_date)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_billing_date',
                                        line: index,
                                        value: _date
                                    });
                                }
                                if (nullCheck(_subsidiary)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_sub',
                                        line: index,
                                        value: _subsidiary
                                    });
                                }
                                if (nullCheck(_vend_bill)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_vend_bill',
                                        line: index,
                                        value: _vend_bill
                                    });
                                }
                                if (nullCheck(_type)) {
                                    subListPayObj.setSublistValue({
                                        id: 'custpage_type',
                                        line: index,
                                        value: _type
                                    });
                                }
                                subListPayObj.setSublistValue({
                                    id: 'custpage_debit_acno',
                                    line: index,
                                    value: _acctnum
                                });
                            }
                        }
                    }
                    form.addSubmitButton({
                        label: 'Submit'
                    });
                    form.clientScriptFileId = 146545;

                    form.addButton({
                        id: 'custpage_button_refresh',
                        label: 'Refresh',
                        functionName: 'refreshSelection()'
                    });

                    context.response.writePage(form);

                } else {
                    // log.debug('inside else');
                    var Bank_Account_Id = context.request.parameters.custpage_bankaccount;
                    log.debug('Bank_Account_Id', Bank_Account_Id);
                    if (nullCheck(Bank_Account_Id)) {
                        var account_num = record.load({
                            type: 'customrecord_pls_companybankdetails', //Loading the record
                            id: Bank_Account_Id,
                            isDynamic: true
                        });
                        var _acctnum = account_num.getValue({
                            fieldId: 'custrecord_pls_compbank_compaccnumber'
                        });
                    }
                    log.debug("_acctnum", _acctnum);
                    if (nullCheck(Bank_Account_Id)) {
                        var fieldLookUp = search.lookupFields({
                            type: 'customrecord_pls_companybankdetails',
                            id: Bank_Account_Id,
                            columns: ['custrecord_pls_compbankdet_compaccnumber']
                        });
                        log.debug("fieldLookUp", fieldLookUp)

                        var bank_subsidiary = fieldLookUp.custrecord_pls_compbankdet_compaccnumber[0]["value"];
                        log.debug("bank_subsidiary", bank_subsidiary)
                    }
                    // log.debug("_acctnum", _acctnum);

                    // var ifsc_num = record.load({
                    // type: 'vendor', //Loading the record
                    // id: 5191,
                    // isDynamic: true
                    // });
                    var process_date = context.request.parameters.custpage_dateofprocess;
                    // log.debug("process_date", process_date)
                    var icic_pay_obj = record.create({
                        type: "customrecord_icici_bank_pay_",
                        isDynamic: true
                    });
                    icic_pay_obj.setValue({
                        fieldId: 'custrecord_icici_date_of_proce',
                        value: process_date
                    });
                    icic_pay_obj.setValue({
                        fieldId: 'custrecord_icici_bank_account',
                        value: Bank_Account_Id
                    });

                    var linecnt = context.request.getLineCount({
                        group: 'custpage_pay_list'
                    });
                    // log.debug('linecnt', linecnt);


                    // var Total_partial_amt = 0;
                    var array_internal = [];
                    // var array_partail_amt = [];
                    // var set_line_value = setline_itemValue2(bankaccnt);
                    // for (var index1 = 0; index1 < set_line_value.length; index1++) {

                    // var Check1 = context.request.getSublistValue({
                    // group: 'custpage_pay_list',
                    // name: 'custpage_pay_checkbox',
                    // line: index1
                    // });
                    // if (Check1 == 'T') {
                    // var _internalId = set_line_value[index1].internal_id_;
                    // array_internal.push(_internalId
                    // );
                    // log.debug("array_internal", array_internal)
                    // var partial_amt = context.request.getSublistValue({
                    //     group: 'custpage_pay_list',
                    //     name: 'custpage_partial_amt',
                    //     line: index1
                    // });
                    // log.debug("partial_amt", partial_amt)
                    // array_partail_amt.push(partial_amt);
                    // log.debug("array_partail_amt", array_partail_amt)

                    // Total_partial_amt += parseFloat(array_partail_amt)
                    // log.debug("Total_partial_amt",Total_partial_amt)

                    // }
                    // }
                    // log.debug("Total_partial_amt",Total_partial_amt)



                    var set_linevalue3 = setline_itemValue2(bank_subsidiary);
                    log.debug("set_linevalue3", set_linevalue3)
                    var arrBenificial = [];

                    for (var index = 0; index < set_linevalue3.length; index++) {

                        var arrPayBillPartialAmt = [];
                        var array_internal = [];
                        var totalPartialAmt = 0;

                        var curr_date = context.request.getSublistValue({
                            group: 'custpage_pay_list',
                            name: 'custpage_date',
                            line: index
                        });
                        var Check = context.request.getSublistValue({
                            group: 'custpage_pay_list',
                            name: 'custpage_pay_checkbox',
                            line: index
                        });
                        var amt = context.request.getSublistValue({
                            group: 'custpage_pay_list',
                            name: 'custpage_amt',
                            line: index
                        });
                        // log.debug("amt", amt)

                        if (Check == 'T') {

                            var _date = set_linevalue3[index].bene_date;
                            var date_ = set_linevalue3[index].fullDate
                            var _beneficialname = set_linevalue3[index].beneficial_name;
                            var _amt = set_linevalue3[index].vendor_amt;
                            var _bankname = set_linevalue3[index].bank_name;
                            if (nullCheck(_bankname == "ICICI Bank")) {
                                var _paymode = "I"
                            } else if (nullCheck(_amt > 200000)) {
                                var _paymode = "R"
                            } else {
                                var _paymode = "N"
                            }
                            var _beneficialaccount = set_linevalue3[index].beneficial_account;
                            var _ifsccode = set_linevalue3[index].ifsc_code;
                            var _mobile = set_linevalue3[index].bene_mobile;
                            var _email = set_linevalue3[index].bene_email;
                            var _address = set_linevalue3[index].bene_address;
                            var _vend_bill = set_linevalue3[index].vend_bill;
                            var _type = set_linevalue3[index].type_;
                            var _internalId = set_linevalue3[index].internal_id_;


                            if (_type != 'VendCred') {

                                //logic of total amount calculation

                                var totalBillAmt = 0;

                                _beneficialname = String(_beneficialname)
                                // log.debug("_beneficialname", _beneficialname)
                                var found = arrBenificial.indexOf(_beneficialname);
                                // log.debug("found", found)

                                if (found == -1) {

                                    for (var j = 0; j < set_linevalue3.length; j++) {

                                        var Check3 = context.request.getSublistValue({
                                            group: 'custpage_pay_list',
                                            name: 'custpage_pay_checkbox',
                                            line: j
                                        });

                                        var partial_amt = context.request.getSublistValue({
                                            group: 'custpage_pay_list',
                                            name: 'custpage_partial_amt',
                                            line: j
                                        });
                                        // log.debug("partial_amt", partial_amt)


                                        if (Check3 == 'T') {

                                            var _benifical_name1 = set_linevalue3[j].beneficial_name;
                                            var _getAmt = set_linevalue3[j].vendor_amt;
                                            var _internalIdBill = set_linevalue3[j].internal_id_;

                                            // log.debug("_getAmt", _getAmt)
                                            var _type1 = set_linevalue3[j].type_;

                                            if (_beneficialname == _benifical_name1) {

                                                // log.debug("_type1", _type1)

                                                if (_type1 == 'VendCred') {


                                                    arrPayBillPartialAmt.push({

                                                        'billId': _internalIdBill,
                                                        'partialAmt': partial_amt || 0,
                                                        '_getAmt': _getAmt

                                                    });

                                                    if (nullCheck(partial_amt)) {

                                                        partial_amt = partial_amt.slice(1);
                                                        totalBillAmt -= parseFloat(partial_amt)
                                                        // log.debug("totalBillAmt in partial_amt  vendor cred", totalBillAmt);

                                                        // totalPartialAmt -= parseFloat(partial_amt)
                                                        // log.debug("totalBillAmt in partial_amt  vendor cred", totalBillAmt);

                                                    } else {

                                                        totalBillAmt -= parseFloat(_getAmt)
                                                        // log.debug("totalBillAmt in original amount vendor cred", totalBillAmt);

                                                        // totalPartialAmt -= parseFloat(_getAmt)
                                                        // log.debug("totalBillAmt in partial_amt  vendor cred", totalBillAmt);
                                                    }


                                                } else {

                                                    arrPayBillPartialAmt.push({

                                                        'billId': _internalIdBill,
                                                        'partialAmt': partial_amt || 0

                                                    });

                                                    if (nullCheck(partial_amt)) {

                                                        totalBillAmt += parseFloat(partial_amt)
                                                        // log.debug("totalBillAmt in partial_amt check", totalBillAmt);

                                                        // totalPartialAmt -= parseFloat(partial_amt)
                                                        // log.debug("totalBillAmt in partial_amt  vendor cred", totalBillAmt);

                                                    } else {

                                                        totalBillAmt += parseFloat(_getAmt)
                                                        // log.debug("totalBillAmt in original amount", totalBillAmt);

                                                        // totalPartialAmt -= parseFloat(_getAmt)
                                                        // log.debug("totalBillAmt in partial_amt  vendor cred", totalBillAmt);
                                                    }

                                                }

                                                array_internal.push(_internalIdBill);
                                                // log.debug("array_internal", array_internal)

                                            }

                                        }

                                    }
                                    // log.debug("totalBillAmt outside of vendor change", totalBillAmt)


                                    // log.debug("arrPayBillPartialAmt", arrPayBillPartialAmt)
                                    // log.debug("arrPayBillPartialAmt parse", JSON.stringify(arrPayBillPartialAmt))



                                    arrBenificial.push(_beneficialname);

                                    icic_pay_obj.selectNewLine({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        line: arrBenificial.length
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_ref_vendor_bill_multi',
                                        value: JSON.stringify(arrPayBillPartialAmt),
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_paymode',
                                        value: _paymode,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecordcustrecord_icici_pay_bill_amt',
                                        value: totalBillAmt || 0,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_paydate',
                                        value: _date,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_pay_date',
                                        value: process_date,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_draccountno',
                                        value: _acctnum,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_bene_name',
                                        value: _beneficialname,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_bene_accountno',
                                        value: _beneficialaccount,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecordcustrecord_icici_pay_bill_ifsc',
                                        value: _ifsccode,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_crnarration',
                                        value: _beneficialname,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_drnarration',
                                        value: _beneficialname,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_benemobno',
                                        value: _mobile,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_bene_emailid',
                                        value: _email,
                                        ignoreFieldChange: true
                                    });

                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_pay_bill_ben_add1',
                                        value: _address,
                                        ignoreFieldChange: true
                                    });
                                    icic_pay_obj.setCurrentSublistValue({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                        fieldId: 'custrecord_icici_refto_billpay',
                                        value: String(array_internal),
                                        ignoreFieldChange: true
                                    });

                                    arrPayBillPartialAmt = JSON.stringify(arrPayBillPartialAmt)
                                    arrPayBillPartialAmt = JSON.parse(arrPayBillPartialAmt);
                                    log.debug("arrPayBillPartialAmt", arrPayBillPartialAmt)

                                    for (var k = 0; k < arrPayBillPartialAmt.length; k++) {

                                        totalPartialAmt += arrPayBillPartialAmt[k].partialAmt;

                                        log.debug("totalPartialAmt", totalPartialAmt)
                                        log.debug("totalPartialAmt true false", totalPartialAmt == 0)

                                    }

                                    if (totalPartialAmt == 0) {

                                        icic_pay_obj.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                            fieldId: 'custrecord_cici_selected_bill_partialamt',
                                            value: 0,
                                            ignoreFieldChange: true
                                        });

                                    } else {

                                        icic_pay_obj.setCurrentSublistValue({
                                            sublistId: 'recmachcustrecord_ref_to_icici_bank_file',
                                            fieldId: 'custrecord_cici_selected_bill_partialamt',
                                            value: parseFloat(totalBillAmt),
                                            ignoreFieldChange: true
                                        });

                                    }

                                    icic_pay_obj.commitLine({
                                        sublistId: 'recmachcustrecord_ref_to_icici_bank_file'
                                    });
                                }
                            }

                        }

                    }

                    var internal_id = icic_pay_obj.save(record, true, true);
                    // log.debug("internal_id", internal_id)

                    if (nullCheck(internal_id)) {
                        redirect.toRecord({
                            type: 'customrecord_icici_bank_pay_',
                            id: internal_id,
                        });
                    }
                }
            } catch (exp) {
                log.debug("exp", exp)
            }
        }


        function setline_itemValue2(bank_subsidiary) {
            try {
                var array = [];
                var transactionSearchObj = search.create({
                    type: "transaction",
                    filters: [
                        ["mainline", "is", "T"],
                        "AND",
                        ["cogs", "is", "F"],
                        "AND",
                        ["accountmain", "noneof", "53"],
                        "AND",
                        ["subsidiary", "anyof", bank_subsidiary],
                        "AND",
                        ["type", "anyof", "VendBill", "VendCred", "VPrep"],
                        "AND",
                        ["amountremainingisabovezero", "is", "T"],
                        "AND",
                        ["vendorline.entityid", "isnotempty", ""],
                        "AND",
                        ["vendor.isinactive", "is", "F"]
                    ],
                    columns: [
                        search.createColumn({
                            name: "trandate",
                            label: "Date"
                        }),
                        search.createColumn({
                            name: "type",
                            label: "Type"
                        }),
                        search.createColumn({
                            name: "invoicenum",
                            label: "Bill Number"
                        }),
                        search.createColumn({
                            name: "legalname",
                            join: "vendor",
                            label: "Beneficiary Name "
                        }),
                        search.createColumn({
                            name: "account",
                            label: "Account Number"
                        }),
                        search.createColumn({
                            name: "memo",
                            label: "Remark"
                        }),
                        search.createColumn({
                            name: "custentity_pls_vendor_bank_name",
                            join: "vendor",
                            label: "Bank Name"
                        }),
                        search.createColumn({
                            name: "accountnumber",
                            join: "vendor",
                            label: "Beneficiary Account Number "
                        }),
                        search.createColumn({
                            name: "custentity_ifsc_code_vendor_mast",
                            join: "vendor",
                            label: "IFSC Code"
                        }),
                        search.createColumn({
                            name: "address1",
                            join: "vendor",
                            label: "Ben Add1"
                        }),
                        search.createColumn({
                            name: "email",
                            join: "vendor",
                            label: "Ben email id"
                        }),
                        search.createColumn({
                            name: "mobilephone",
                            join: "vendor",
                            label: "Bene Mobile Number"
                        }),
                        search.createColumn({
                            name: "fxamountremaining",
                            label: "Amount"
                        }),
                        search.createColumn({
                            name: "subsidiary",
                            label: "Subsidiary"
                        }),
                        search.createColumn({
                            name: "amountremainingisabovezero",
                            label: "Amount Remaining is above 0"
                        }),
                        search.createColumn({
                            name: "internalid",
                            label: "Internal ID"
                        })
                    ]
                });

                // var myResults = getAllResults(transactionSearchObj);
                var myResults = transactionSearchObj.run().getRange(0, 1000);
                // myResults.forEach(function (result) {
                for (var i = 0; i < myResults.length; i++) {

                    var vendrec2 = {
                        "beneficial_name": myResults[i].getValue(search.createColumn({
                            name: "legalname",
                            join: "vendor",
                            label: "Beneficiary Name"
                        })),
                        "vendor_amt": myResults[i].getValue(search.createColumn({
                            name: "fxamountremaining",
                            label: "Amount"
                        })),
                        "beneficial_account": myResults[i].getValue(search.createColumn({
                            name: "accountnumber",
                            join: "vendor",
                            label: "Beneficiary Acount No"
                        })),
                        "ifsc_code": myResults[i].getValue(search.createColumn({
                            name: "custentity_ifsc_code_vendor_mast",
                            join: "vendor",
                            label: "IFSC Code"
                        })),
                        "bene_address": myResults[i].getValue(search.createColumn({
                            name: "address1",
                            join: "vendor",
                            label: "Ben add1"
                        })),
                        "bene_mobile": myResults[i].getValue(search.createColumn({
                            name: "mobilephone",
                            join: "vendor",
                            label: "Bene Mobile no"
                        })),
                        "bene_email": myResults[i].getValue(search.createColumn({
                            name: "email",
                            join: "vendor",
                            label: "Bene email id"
                        })),
                        "bene_date": myResults[i].getValue(search.createColumn({
                            name: "trandate",
                            label: "Date"
                        })),
                        "bank_name": myResults[i].getText(search.createColumn({
                            name: "custentity_pls_vendor_bank_name",
                            join: "vendor",
                            label: "Bank Name"
                        })),
                        "subsidiary_": myResults[i].getText(search.createColumn({
                            name: "subsidiary",
                            label: "Subsidiary"
                        })),
                        "vend_bill": myResults[i].getValue(search.createColumn({
                            name: "invoicenum",
                            label: "Bill Number"
                        })),

                        "type_": myResults[i].getValue(search.createColumn({
                            name: "type",
                            label: "Type"
                        })),

                        "internal_id_": myResults[i].getValue(search.createColumn({
                            name: "internalid",
                            label: "Internal ID"
                        })),
                    }
                    array.push(vendrec2);

                }
                return array;
                // }
                // array.push(vendrec2);
                // return true;
                // });
                // return array;
            } catch (exp) {
                log.debug("exp", exp)
            }
        }



        function getAllResults(s) {
            var results = s.run();

            var searchResults = [];
            var searchid = 0;
            do {
                var resultslice = results.getRange({
                    start: searchid,
                    end: searchid + 1000
                });
                resultslice.forEach(function(slice) {
                    searchResults.push(slice);
                    searchid++;
                });
            } while (resultslice.length >= 1000);
            return searchResults;
        }

        function nullCheck(value) {
            if (value != null && value != '' && value != undefined)
                return true;
            else
                return false;
        }
        return {
            onRequest: onRequest
        };
    });