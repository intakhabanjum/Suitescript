var invoice = record.load({
    type: record.Type.INVOICE,
    id: 249,
    isDynamic: true
});

var invoiceId = invoice.getValue({
    fieldId: 'tranid'
});
log.debug('invoiceId', invoiceId);
log.debug('invoice', invoice);
if (nullCheck(invoiceId)) {   
    var invoiceDate = invoice.getValue({
        fieldId: 'trandate'
    });   

    //format.format gives us required format for our respective use.,Formats a value from the raw value to its appropriate preference format
    var invoiceDatef = format.format({
        value: invoiceDate,
        type: format.Type.DATE
    });

    //Sourced Company Name from Subsidiary that is why fieldid is selected as subsidiary
    var companyName = invoice.getText({  
        fieldId: 'subsidiary'  
    });
    //From Subsidiary Record I have sourced Company Address,so here by getValue we get internal id of subsidiary
    var subsVal = invoice.getValue({      
        fieldId: 'subsidiary'   
    });  
    //With Subsidiary I have sourced its Parent Subsidiary as Company Address was matching with its Parent subsidiary    

    if (nullCheck(subsVal)) {
        var subsId = search.lookupFields({
            type: search.Type.SUBSIDIARY,
            id: subsVal,
            columns: ['parent']
        });
        //we get internal id of Parent Subsidiary
        var subsId1 = subsId.parent;

        //We load Parent Subsidiary by passing id
        var parentSub = record.load({
            type: record.Type.SUBSIDIARY,
            id: subsId1,
            isDynamic: true 
        });
        //We get Address of Company=Parent Subsidiary
        var companyAddr = parentSub.getText({
            fieldId: 'mainaddress_text'
        }); 
    }
    //By Using xml.escape we prepare a string for use in XML by escaping XML markup, such as angle brackets, quotation marks, and ampersands.
    companyAddr = xml.escape({
        xmlText: companyAddr
    });
    //The split() method splits a string into an array of substrings and returns new array without changing original string
    if (companyAddr) {
        companyAddr = companyAddr.split('\n');
    }
    //We source logo from Parent Subsidiary Record,with getValue we will get internal id of logo
    var companyLogo = parentSub.getValue({
        fieldId: 'logo'
    });
    //log.debug(companyLogo);
    //We load the logo with internal id in file cabinet of netsuite 
    var fileObj = file.load({
        id: companyLogo
    });
    //We get URL of logo
    var logoURL = fileObj.url;
    //log.debug(logoURL);
    //We load our Account's Configuration 
    var companyInfo = config.load({
        type: config.Type.COMPANY_INFORMATION,
    });
    //We get our current Account's URL Domain
    var appurl = companyInfo.getValue("appurl");
    //log.debug(appurl);
    //We Concat Domain and logo URL
    var logoImage = appurl.concat(logoURL);
    //log.debug(logoImage);
    //We replace & with &amp; from our URL to use in XML code
    var logo = logoImage.replace(/&/g, "&amp;");
    //log.debug(logo);

    var billingAddr = invoice.getText({
        fieldId: 'billaddress'
    });
    billingAddr = xml.escape({
        xmlText: billingAddr
    });

    if (billingAddr) {
        billingAddr = billingAddr.split('\n');
    }

    var shipingAddr = invoice.getText({
        fieldId: 'shipaddress'
    });

    shipingAddr = xml.escape({
        xmlText: shipingAddr
    });

    if (shipingAddr) {
        shipingAddr = shipingAddr.split('\n');
    }

    str += '<table style="width: 100%; margin-top: 10px;"><tr>';
                        str += '<td class="addressheader" colspan="3" style="width: 233px;"><span style="font-size:14px;"><u><strong><span class="nameandaddress">' + companyName + '</span></strong></u></span><br />';
                        if (companyAddr) {
                            for (var cdl = 0; cdl < companyAddr.length; cdl++) {
                                str += '<span>' + companyAddr[cdl] + '</span><br />';
                            }
                        }
                        str += '   </td>';
                        str += '<td class="addressheader" colspan="3" style="width: 179px;"><br />&nbsp;</td>';
                        str += '<td class="totalboxtop" colspan="5"><b>TOTAL</b></td>';
                        str += '</tr>';
                        str += '<tr>';
                        str += '<td class="address" colspan="3" rowspan="2" style="width: 233px;"><br /><strong>Bill To&nbsp;:</strong><br />';
                        if (billingAddr) {
                            for (var bdl = 0; bdl < billingAddr.length; bdl++) {
                                str += '<span>' + billingAddr[bdl] + '</span><br />';
                            }
                        }
                        str += '   </td>';

                        str += '<td class="address" colspan="3" rowspan="2" style="width: 179px;"><br /><strong>Ship To&nbsp;:&nbsp;</strong><br />';
                        if (shipingAddr) {
                            for (var sdl = 0; sdl < shipingAddr.length; sdl++) {
                                str += '<span>' + shipingAddr[sdl] + '</span><br />';
                            }
                        }
                        str += '   </td>';