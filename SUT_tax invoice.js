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
                    var getRecType = context.request.parameters.custpage_recType;
                    var getRecId = context.request.parameters.custpage_recId;
                    log.debug("getRecId", getRecId)
					var invoice = record.load({
                        type: 'invoice', //Loading the record
                        id: getRecId,
                        isDynamic: true
                    });
					
                    

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

                    xml += "</head>";
                    xml += "<body  size='Letter'  footer='myfooter' footer-height='20pt' header='myHead' header-height='12%'>";


                    xml += '<table width="100%">';
                    xml += "<tr>";
                    xml += '<td style="width:100%;" align="center" border-bottom="1px solid black" border-top="1px solid black" border-left="1px solid black" border-right="1px solid black"><span style="font-size:13px"><b>PROFORMA INVOICE</b></span></td>';
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