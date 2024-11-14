/*-----------------------------------------------------------------------------------------------------------------------------------
 CompanyName  :  Nuvista Technologies
 ScriptName   :  SUT_Print Proforma Invoice
 Author       :  NVT employee
 Description  :  On click button generate Proforma Invoice Print.
 
 -----------------------------------------------------------------------------------------------------------------------------------*/
/**
@NApiVersion 2.1 
@NScriptType Suitelet
*/
// START SUITELET FUNCTION  =====================================================================
define(['N/ui/serverWidget', 'N/record', 'N/search', 'N/config', 'N/render', 'N/runtime', 'N/file', 'N/xml', 'N/format'],
    function(serverWidget, record, search, config, render, runtime, file, xmlobj, format) {
        function onRequest(context) {
            if(context.request.method == 'GET') {  

                try {  

                    var companyInfo = config.load({
                        type: config.Type.COMPANY_INFORMATION
                    });    

                    var companyName = companyInfo.getValue({
                        fieldId: 'legalname'  
                    });         

                    var companyAddress = companyInfo.getValue({
                        fieldId: 'mainaddress_text'
                    });      

                    var companySecondAddress = companyInfo.getValue({
                        fieldId: 'shippingaddress_text'
                    });     
                    
                    var companyreturnAdd = companyInfo.getValue({
                        fieldId: 'returnaddress_text'
                    });   

                    var placeofReceipt = companyInfo.getValue({
                        fieldId: 'custbody_place_of_receipt'
                    });   

                    var portofLoading = companyInfo.getValue({
                        fieldId: 'custbody_port_of_loading'
                    });   

                    var PortofDischarge = companyInfo.getValue({
                        fieldId: 'custbody_port_of_discharge'
                    }); 

                    var FinalDistination = companyInfo.getValue({
                        fieldId: 'custbody_final_destination'
                    }); 

                    var VehicleNumber = companyInfo.getValue({
                        fieldId: 'custbody_vehicle_no'
                    });  

                    var LrNumber = companyInfo.getValue({
                        fieldId: 'custbody_lr_no'
                    });  

                    
                    var ExmcodeNumber = companyInfo.getValue({
                        fieldId: 'custbody_exm_code_no'
                    }); 

                    var GstiNumber = companyInfo.getValue({
                        fieldId: 'custbody_gstin_no'
                    });


                    log.debug(GstiNumber);

                    var getRecType = context.request.parameters.custpage_recType;
                    var getRecId = context.request.parameters.custpage_recId;
                    // log.debug("getRecId", getRecId)
					var invoice = record.load({
                        type: 'invoice', //Loading the record
                        id: getRecId,
                        isDynamic: true
                    });

                    var invoiceId = invoice.getValue({
                        fieldId: 'tranid'
                    });
                    // log.debug('invoiceId', invoiceId);

                    if (nullCheck(invoiceId)) {   
                        var invoiceDate = invoice.getValue({
                            fieldId: 'trandate'
                        }); 

                        //format.format gives us required format for our respective use.,Formats a value from the raw value to its appropriate preference format

                        var invoiceDatef = format.format({
                            value: invoiceDate,
                            type: format.Type.DATE
                        });
                    }

                    

               

					
                    //----------------------------HTML PDF  START------------------------------------------------------
                    var xml = "";
                    xml += '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
                    xml += "<pdf>";
                    xml += "";
                    xml += "";
                    xml += "<head>";

                    xml += "<macrolist>";
                    xml += "<macro id='myfooter'>";
                    // xml += "<table  border='0' width='100%'>";
                    // xml += "<tr>";
					 // xml += "<td  align='center' width='90%'><img src=\"" + ImageUrl_footer + "\"  style=\"width:50%; height:50px;\"></img> </td>";
                    // xml += "<td  align='right' font-size='8' width='10%'> <pagenumber/> of <totalpages/></td>";
                    // xml += "</tr>";
                    // xml += "</table >";
                    xml += "</macro>";
                    xml += "<macro id='myHead'>";
                    // xml += '<table width="100%">';
                    // xml += "<tr>";

                    // xml += "<td style='width:100%;' align='center'><img src=\"" + ImageUrl_Envotek + "\"  style=\"width:100%; height:100px;\"></img></td>";
                   
                    // xml += "</tr>";
                    // xml += "</table>";
                    xml += "</macro>";
                    xml += "</macrolist>";

                    xml += "<style>@importurl('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700')</style>";

                    xml += '.courier-prime-regular{font-family: "Courier Prime", monospace;font-weight: 400;font-style: normal;}';

                    xml += '<style>'

                    xml += ' * { '
                    xml += 'border-collapse: collapse ;'
                    xml += ' }  '

                    xml +=   'td.styling {'
                    xml +=   'width:100%;'
                    xml +=   'border-collapse: collapse;'
                    xml +=   'font-size: 13px;'
                    xml +=    'border-bottom:1px solid black;'
                    xml +=    'border-top:1px solid black;'
                    xml +=    'border-left:1px solid black;'
                    xml +=    'border-right:1px solid black;'
                    xml +=    'border-collapse: collapse;'
                    xml += ' }'

                    xml +=   'td.tables_tyling {'
                    xml +=   'width:50%;'
                    xml +=   'border-collapse: collapse;'
                    xml +=   'font-size: 10px;'
                    xml +=    'text-align:left;'
                    xml +=    'border-bottom:1px solid black;'
                    xml +=    'border-top:1px solid black;'
                    xml +=    'border-left:1px solid black;'
                    xml +=    'border-right:1px solid black;'
                    xml += ' }'

                    xml +=   'td.designing {'
                    xml +=   'font-size: 10px;'
                    xml +=    'text-align:left;'
                    xml +=    'border-bottom:1px solid black;'
                    xml +=    'border-top:1px solid black;'
                    xml +=    'border-left:1px solid black;'
                    xml +=    'border-right:1px solid black;'
                    xml += ' }'


                    
                    xml +=   'td.buttom_table {'
                    xml +=   'font-size: 10px;'
                    xml +=    'text-align:center;'
                    xml +=    'border-bottom:1px solid black;'
                    xml +=    'border-top:1px solid black;'
                    xml +=    'border-left:1px solid black;'
                    xml +=    'border-right:1px solid black;'
                    xml +=    'border-collapse: collapse;'
                    xml += ' }'


                    
                    xml +=   'td.footers {'
                    xml +=   'width:50%;'
                    /* xml +=   'padding-bottom:20px;' */
                    xml +=   'font-size: 10px;'
                    xml +=    'text-align:center;'
                    xml +=    'border-bottom:1px solid black;'
                    xml +=    'border-top:1px solid black;'
                    xml +=    'border-left:1px solid black;'
                    xml +=    'border-right:1px solid black;'
                    xml +=    'border-collapse: collapse;'
                    xml += ' }'





                    xml += ''
                    xml += '</style>'

                    xml += "</head>";

                    xml += "<body  size='Letter'  footer='myfooter' footer-height='20pt' header='myHead' header-height='0%'>";


                    xml += '<table width="100%" text-align="center">';
                    xml += "<tr>";
                    xml += '<td align="center" class="styling"><span><b>PACKING LIST</b></span></td>';
                    xml += "</tr>";
                    xml += "</table>";

                    xml += '<table width="100%">';
                    xml += '<tr>';


                    xml += '<td class="tables_tyling" width="50%">';
                    xml += '<table width="100%">'; 
                    xml += "<tr>"; 
                    xml += '<td><span style="font-size:13px"><b>Exporter</b> </span> <br/> '+ companyName +' <br/>  '+ companyAddress +' <br/>  </td>';
                    xml += '</tr>';
                    xml += '</table>'; 

                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td  ><span style="font-size:13px;"> <b> Dispatch From</b></span><br/> ' + companySecondAddress + '<br/> <b style=" line-height:20"> GSTN ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :  ' +GstiNumber+ ' </b> <br/> <b>PAN NO  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :AAACB4321N</b> </td>';
                    xml += "</tr>";
                    xml += "</table>"; 

                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td ><span style="font-size:13px;"> <b>Consignee</b></span><br/> ' + companyreturnAdd + ' <br/> <b style="line-height:20 "> PAN NO. 602460091 </b> </td>';
                    xml += "</tr>";
                    xml += "</table>"; 

                    xml += '<table width="100%" >';                                            
                    xml += "<tr>";
                    xml += '<td  style="border-top:1px solid black; border-right: 1px solid black;"  ><span > <b>  </b> </span></td>';
                    xml += '<td  style="border-top:1px solid black;"><span > <b> Place of Receipt  by </b> <br/> ' + placeofReceipt +' </span></td>';
                    xml += "</tr>";
                    xml += "</table>";     


                    xml += '<table width="100%">';                   
                    xml += "<tr>";
                    xml += '<td style="border-top:1px solid black; border-right: 1px solid black;"   ><span > <b> Vessel / Flight No. </b> <br/>  </span></td>';
                    xml += '<td  style="border-top:1px solid black;" ><span > <b> Port of Loading </b> <br/> '+ portofLoading +' </span></td>';
                    xml += "</tr>";
                    xml += "</table>"; 


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td  style="border-top:1px solid black; border-right: 1px solid black;" ><span > <b> Port of Discharge </b> </span>'

                    xml += '<table width="100%" style="padding-top: 40 px;">';
                    xml += "<tr>";
                    xml += '<td > <span > '+ PortofDischarge +' </span></td>'; 
                    xml += "</tr>";       
                    xml += "</table>"; 
                    
                    
                    
                    xml += '</td>';
                    xml += '<td  style="border-top:1px solid black;"  ><span > <b> Final Destination </b> </span>'

                    xml += '<table width="100%" style="padding-top: 40 px;">';
                    xml += "<tr>";
                    xml += '<td  > <span >' + FinalDistination + ' </span></td>'; 
                    xml += "</tr>";       
                    xml += "</table>"; 
                    
                    
                    xml += '</td>';  
                    xml += "</tr>";       
                    xml += "</table>";     


                    xml += '</td>';

                    /* left table data above  */

                    /* right table data from below  */

                    xml += '<td class="tables_tyling" width="50%" >';
                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td  style="width: 50%; border-right: 1px solid black;"> <b>Invoice Number and Date </b> <br/>BAL/GN/17/24-25 Date' + invoiceDatef + '</td>';
                    xml += '<td style="width: 50%; border-left: 1px solid black;" > <b>Exporters Ref: </b><br/> IE Codes : 0989001768 </td>';
                    xml += '</tr>';
                    xml += '</table>'; 

                    xml += '<table Width="100%" style="border-top:1px solid black; ">';
                    xml += '<tr>';
                    xml += '<td > <b>Buyers Order No and Date: </b> </td>';
                    xml += '</tr>';
                    xml += '</table>';

                    xml += '<table Width="100%" style="border-top:1px solid black;">';
                    xml += '<tr>';
                    xml += '<td > <b> PO. No and Date :LC NO. EB0011FOU04034 Date 13/05/2024</b> <br/> BAL/TRADE/EXP/P-02/2024-2025; ' + invoiceDatef + ' </td>';
                    xml += '</tr>';
                    xml += '</table>';

                    
                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td  ><span style="font-size:13px;">Buyer(if other than consignee):</span><br/> <b> To order of the EVEREST BANK LIMITED, </b><br/> <b> Heads OFFICE,TRADE FINANCE SERVICES UNIT,NEW BANESHWOR </b> <br/> <b>KATHMANDU,NEPAL </b> </td>';
                    xml += "</tr>";
                    xml += "</table>"; 

                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td  style="border-top:1px solid black; border-right: 1px solid black;" ><span > <b>Country of Origin of Goods</b> <br/> <b>India</b> </span></td>';
                    xml += '<td  style="border-top:1px solid black;" ><span > <b>Country of final Destination</b> <br/> <b>Nepal</b> </span></td>';
                    xml += "</tr>";
                    xml += "</table>"; 
                    
                    xml += '<table width="100%" style="border-top:1px solid black; ">';
                    xml += "<tr>";
                    xml += '<td ><span > Term of Delivery: CFR-KATHMANDU,NEPAL <br/> Term of Payment: <b> LC 7 DAYS AT SIGHT </b> </span></td>';
                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td   colspan="2"><span> LC issuing Bank detail: <br/> <b> EVEREST BANK LIMITED </b></span></td>';
                    xml += "</tr>";
                    xml += "</table>";

                    xml += '<table width="100%" style="border-top:1px solid black; ">';
                    xml += "<tr>";
                    xml += '<td  ><span> <b> Our Banker detail:-( Make the Payment Through RTGS) </b> <br/> <b>Our Banker detail : Indian Overseas Bank</b> <br/> BRANCH : Basheer Bagh <br/> A/c # 130102000001065 <br/>IFSC Codes : IOBA0001301 </span></td>';
                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td  ><span> <b>Vehicle No </b> <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : '+ VehicleNumber +' </b> <br/> <b>LR No and Date </b> <b>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :' + LrNumber+ ' Date '+ invoiceDatef + ' </b>  </span></td>';
                    xml += "</tr>";
                    xml += "</table>";

                    xml += '<table width="100%" style="border-top:1px solid black;">';
                    xml += "<tr>";
                    xml += '<td ><span> <b> EXIM CODEs NO.  ' + ExmcodeNumber + ' </b> </span></td>';
                    xml += "</tr>";
                    xml += "</table>";


                    xml += '</td>';



                    xml += '</tr>';
                    xml += '</table>'; 


                    
                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 15%; "><span > <b> MARKS and   <br/> NOS  </b> </span></td>';
                    xml += '<td class="buttom_table" style="width: 25%; "><span> <b> PRODUCT DESCRIPTION  </b>  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;"><span> <b>Each Pkt Wt <br/> In Gms </b> </span></td>';
                    xml += '<td class="buttom_table" style="width: 12%; "><span > <b> PRODUCT <br/>  HSCODE </b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;" ><span > <b> Quantity <br/>  In cartons </b>  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span > <b>  NET WEIGHT <br/> IN KGS  </b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span >  <b> GROSS WEIGHT <br/>  IN KGS  </b> </span></td>';

                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 25%; padding-top: 10px; padding-bottom: 10px;"><span> <b> Each Pkt Wt </b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 50%; padding-top: 10px; padding-bottom: 10px;"><span> 295 VARIOUS TYPES OF MACARONI , VARIOUS TYPES OF VERMICELLI, SOYA CHUNK , SPHAGHETTI MEDIUM ,ROASTED VERMICELLI,LONGCUT SEVAI AND MACRONI MASALA  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 18%; padding-top: 10px; padding-bottom: 10px;"><span> <b>Quantity </b> </span></td>';
                    xml += "</tr>";
                    xml += "</table>";




                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 15%; "><span > 4  </span></td>';
                    xml += '<td class="buttom_table" style="width: 25%; "><span> <b>MACARONI REGULAR TROTT</b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;"><span> 34x350G</span></td>';
                    xml += '<td class="buttom_table" style="width: 12%; "><span > 19021900 </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;" ><span > 170   </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span > 2193  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span >  2023  </span></td>';

                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 15%; "><span > 4  </span></td>';
                    xml += '<td class="buttom_table" style="width: 25%; "><span> <b>MACARONI REGULAR TROTT</b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;"><span> 34x350G</span></td>';
                    xml += '<td class="buttom_table" style="width: 12%; "><span > 19021900 </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;" ><span > 170   </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span > 2193  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span >  2023  </span></td>';

                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 15%; "><span > 4  </span></td>';
                    xml += '<td class="buttom_table" style="width: 25%; "><span> <b>MACARONI REGULAR TROTT</b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;"><span> 34x350G</span></td>';
                    xml += '<td class="buttom_table" style="width: 12%; "><span > 19021900 </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;" ><span > 170   </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span > 2193  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span >  2023  </span></td>';

                    xml += "</tr>";
                    xml += "</table>";


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="buttom_table" style="width: 15%; "><span > 4  </span></td>';
                    xml += '<td class="buttom_table" style="width: 25%; "><span> <b>Total</b> </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;"><span> </span></td>';
                    xml += '<td class="buttom_table" style="width: 12%; "><span >  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%;" ><span > 170   </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span > 2193  </span></td>';
                    xml += '<td  class="buttom_table" style="width: 12%; "><span >  2023  </span></td>';

                    xml += "</tr>";
                    xml += "</table>";







                    
                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td class="footers" style="line-height: 13px;"><span style="font-size:10px;"> <b>Declaration</b>  </span> <br/> We declare that this Packing List shows the actual weight of the goods <br/> described and that all particulars are true and correct.</td>';




                    xml += '<td align="center" class="footers" ><span style="font-size:10px;"> <b>FOR ' + companyName +' </b> </span> <br/>'

                    xml += '<table width="100%" align="center">';
                    xml += "<tr>";
                    xml += '<td align="center" style="padding-top: 50px;" colspan="2"><span style="font-size:10px;  "> <b>Signature </b> </span> </td>';
                    xml += "</tr>";
                    xml += "</table>";
                    xml += '</td>';



                    xml += "</tr>";
                    xml += "</table>";


                        
    



                    xml += "</body>";
                    xml += "</pdf>";

                    var renderer = render.create();
                    renderer.templateContent = xml;
                    renderer.addRecord({
                        templateName: 'record',
                        record: invoice
                    });
                    var _xmlString = renderer.renderAsString();
                    var pdfFile = render.xmlToPdf({
                        xmlString: _xmlString
                    });
                    context.response.writeFile({
                        file: pdfFile,
                        isInline: true
                    });
                    // }



                } catch (exp) {
                    log.debug("exp", exp)
                }

            }
        }




        // Checking log Validation 	End ---------------
        return {
            onRequest: onRequest
        }
    });
// END SUITELET FUNCTION  ============================================================================

//function to check null values
function nullCheck(value) {
    if(value != null && value != '' && value != undefined)
        return true;
    else
        return false;
}