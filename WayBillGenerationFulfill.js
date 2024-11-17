function nullCheck(value)
{	
	if (value != null && value != '' && value != undefined)
		return true;
	else
		return false;
}
function After_Submit_WayBillGenerationfulfill(type)
{ 
	var recId=nlapiGetRecordId();
	var recType =nlapiGetRecordType();
	try
	{

	if(type!='delete')
	{
		var url = 'http://182.75.121.142:30/';   //for .net no use now coz direct integration with Netsuite
		
		var loadRecord = nlapiLoadRecord(recType,recId);	
		var Way_bill_no=loadRecord.getFieldValue('custbody_way_bill_number');
		var DeclaredValue="";
		var PieceCount="";
		var ActualWeight="";
		//var way_bill_no="";	
		var CollactableAmount="";
		var pdf_folder="";
		var final_product_weight=0;
		var ActualWeight_total=0;
		var ActualWeight_total_final=0;
		var pack_type="";
		var CustomerMobile="";
		var special_instruction="";
		var CustomerTelephone="";
		var Commodity="";
		var ItemDetailsString="";
		var sales_tran_id="";
		if(!nullCheck(Way_bill_no))
		{
			var Sales_id=loadRecord.getFieldValue('createdfrom');
			
			var sales_total=nlapiLookupField('salesorder', Sales_id, 'total');
			sales_total=nlapiEscapeXML(sales_total);
			nlapiLogExecution('DEBUG', 'sales_total', sales_total);
			var Ship_Carrirr=loadRecord.getFieldValue('custbody_ns_order_ship_carrier');
			var Product_type=loadRecord.getFieldText('custbody_blue_dart_product_type');
			var Sub_Product_Code_id=loadRecord.getFieldValue('custbody_blue_dart_sub_product_code');
			var Sub_Product_Code="";
			if(nullCheck(Sub_Product_Code_id))
			{
				Sub_Product_Code= nlapiLookupField('customrecord_blue_dart_sub_prodcode', Sub_Product_Code_id, 'custrecord_blue_dart_code');		
				var Ship_Carrirr_fields = ['custrecord_blue_dart_telephone_number','custrecord_ns_packtype','custrecord_ns_ship_contact_no','custrecord_spl_instruction','custrecord_ns_blue_dart_pdf_folder','custrecord_ns_shipping_mode','custrecord_blue_dart_product_code','custrecord_ns_ship_location_address3','custrecord_ns_ship_location_address2','custrecord_soap_version','custrecord_blue_dart_password','custrecord_is_pay_to_customer','custrecord_ns_ship_login_id','name','custrecord_ns_ship_origin_area','custrecord_ns_ship_location_address','custrecord_ns_ship_pincode','custrecord_ns_ship_customer_code', 'custrecord_ns_ship_licence_key','custrecord_ns_ship_tracking_api','custrecord_sandbox_url','custrecord_production_url'];
				if(nullCheck(Ship_Carrirr))
				{
					var columnsfields = nlapiLookupField('customrecord_ns_ship_config', Ship_Carrirr, Ship_Carrirr_fields);			
					var OriginArea=columnsfields.custrecord_ns_ship_origin_area;
					OriginArea=nlapiEscapeXML(OriginArea);
					var Customer_code = columnsfields.custrecord_ns_ship_customer_code;
					Customer_code=nlapiEscapeXML(Customer_code);
					var CustomerName=columnsfields.name;
					//CustomerName=nlapiEscapeXML(CustomerName);
					var CustomerAddress1=columnsfields.custrecord_ns_ship_location_address;
					//CustomerAddress1=nlapiEscapeXML(CustomerAddress1);
					var CustomerAddress2=columnsfields.custrecord_ns_ship_location_address2;
					//CustomerAddress2=nlapiEscapeXML(CustomerAddress2);
					var CustomerAddress3=columnsfields.custrecord_ns_ship_location_address3;
					//CustomerAddress3=nlapiEscapeXML(CustomerAddress3);
					var CustomerPincode = columnsfields.custrecord_ns_ship_pincode;
					CustomerPincode=nlapiEscapeXML(CustomerPincode);
					var GetPayCustomer=columnsfields.custrecord_is_pay_to_customer;	

					var demoAPIBluDart = columnsfields.custrecord_sandbox_url;
					demoAPIBluDart=nlapiEscapeXML(demoAPIBluDart);
					var liveAPIBluDart = columnsfields.custrecord_production_url;
					liveAPIBluDart=nlapiEscapeXML(liveAPIBluDart);

							
					pdf_folder=columnsfields.custrecord_ns_blue_dart_pdf_folder;
					
					/*******************************New parameters added 23-11-2019**************************************************/	
					pack_type=columnsfields.custrecord_ns_packtype;
					pack_type=nlapiEscapeXML(pack_type);
					
					CustomerMobile=columnsfields.custrecord_ns_ship_contact_no;
					CustomerMobile=nlapiEscapeXML(CustomerMobile);
					
					special_instruction=columnsfields.custrecord_spl_instruction;
					//special_instruction=nlapiEscapeXML(special_instruction);
					
					CustomerTelephone=columnsfields.custrecord_blue_dart_telephone_number;
					CustomerTelephone=nlapiEscapeXML(CustomerTelephone);
					/********************************New parameters added 23-11-2019*************************************************/				
					nlapiLogExecution('DEBUG', 'pack_type', pack_type);
					nlapiLogExecution('DEBUG', 'CustomerMobile', CustomerMobile);
					nlapiLogExecution('DEBUG', 'special_instruction', special_instruction);
					nlapiLogExecution('DEBUG', 'CustomerTelephone', CustomerTelephone);
					
					
					var IsToPayCustomer="";
					if(GetPayCustomer=="T")
					{
						IsToPayCustomer="true"
					}
					else
					{
						IsToPayCustomer="false"
					}	
					IsToPayCustomer=nlapiEscapeXML(IsToPayCustomer);
					nlapiLogExecution('DEBUG', 'OriginArea', OriginArea);
					nlapiLogExecution('DEBUG', 'Customer_code', Customer_code);
					nlapiLogExecution('DEBUG', 'CustomerName', CustomerName);
					nlapiLogExecution('DEBUG', 'CustomerAddress1', CustomerAddress1);
					nlapiLogExecution('DEBUG', 'CustomerAddress2', CustomerAddress2);
					nlapiLogExecution('DEBUG', 'CustomerAddress3', CustomerAddress3);
					nlapiLogExecution('DEBUG', 'CustomerPincode', CustomerPincode);
					nlapiLogExecution('DEBUG', 'IsToPayCustomer', IsToPayCustomer);
					
					if(nullCheck(Sales_id))
					{
						sales_tran_id=nlapiLookupField('salesorder', Sales_id, 'tranid');
						sales_tran_id=nlapiEscapeXML(sales_tran_id);
						nlapiLogExecution('DEBUG', 'sales_tran_id', sales_tran_id);				
						var salesorderSearch = nlapiSearchRecord("salesorder",'customsearch_sales_ship_address',
						[
						   ["internalid","anyof",Sales_id]
						], 
						[
						   new nlobjSearchColumn("internalid"), 
						   new nlobjSearchColumn("tranid"), 
						   new nlobjSearchColumn("shipaddress1"), 
						   new nlobjSearchColumn("shipaddress2"), 
						   new nlobjSearchColumn("shipaddress3"), 
						   new nlobjSearchColumn("shipcity"), 
						   new nlobjSearchColumn("shipcountrycode"), 
						   new nlobjSearchColumn("shipstate"), 
						   new nlobjSearchColumn("shipzip"),
						   new nlobjSearchColumn("shipaddressee"), 
						   new nlobjSearchColumn("shipphone")
						]
						);	
						var consi_name=""; 
						var consi_address1="";
						var consi_address2="";
						var consi_address3="";
						var consi_shipcity="";
						var consi_shipstate="";
						var consi_shipzip="";
						var consi_phone="";
						if(nullCheck(salesorderSearch))
						{
							consi_address1=salesorderSearch[0].getValue("shipaddress1");
							consi_address2=salesorderSearch[0].getValue("shipaddress2");
							consi_address3=salesorderSearch[0].getValue("shipaddress3");
							consi_shipcity=salesorderSearch[0].getValue("shipcity");
							consi_shipstate=salesorderSearch[0].getValue("shipstate");
							consi_shipzip=salesorderSearch[0].getValue("shipzip");
							consi_phone=salesorderSearch[0].getValue("shipphone");
							consi_name=salesorderSearch[0].getValue("shipaddressee");
								
							var ConsigneeName=consi_name;
							//ConsigneeName=nlapiEscapeXML(ConsigneeName);
							var ConsigneeAddress1=consi_address1;
							//ConsigneeAddress1=nlapiEscapeXML(ConsigneeAddress1);
							var ConsigneeAddress2=consi_address2;
							//ConsigneeAddress2=nlapiEscapeXML(ConsigneeAddress2);
							var ConsigneeAddress3=consi_address3+','+consi_shipcity+','+consi_shipstate;
							//ConsigneeAddress3=nlapiEscapeXML(ConsigneeAddress3);
							var ConsigneePincode=consi_shipzip;
							ConsigneePincode=nlapiEscapeXML(ConsigneePincode);
							var ConsigneeMobile=consi_phone;
							ConsigneeMobile=nlapiEscapeXML(ConsigneeMobile);
							var ProductCode=columnsfields.custrecord_blue_dart_product_code;  
							ProductCode=nlapiEscapeXML(ProductCode);						
							var RegisterPickup="false";  
							RegisterPickup=nlapiEscapeXML(RegisterPickup);
							var SubProductCode=Sub_Product_Code;  
							SubProductCode=nlapiEscapeXML(SubProductCode);						
							var ProductType='ProductType.'+Product_type;     
							ProductType=nlapiEscapeXML(ProductType);

							nlapiLogExecution('DEBUG', 'ConsigneeName', ConsigneeName);
							nlapiLogExecution('DEBUG', 'ConsigneeAddress1', ConsigneeAddress1);
							nlapiLogExecution('DEBUG', 'ConsigneeAddress2', ConsigneeAddress2);
							nlapiLogExecution('DEBUG', 'ConsigneeAddress3', ConsigneeAddress3);
							nlapiLogExecution('DEBUG', 'ConsigneePincode', ConsigneePincode);
							nlapiLogExecution('DEBUG', 'ConsigneeMobile', ConsigneeMobile);						 
							nlapiLogExecution('DEBUG', 'ProductCode', ProductCode);			
							nlapiLogExecution('DEBUG', 'RegisterPickup', RegisterPickup);			
							nlapiLogExecution('DEBUG', 'SubProductCode', SubProductCode);
							nlapiLogExecution('DEBUG', 'ProductType', ProductType);
							
							//var CreditReferenceNo=loadRecord.getFieldValue('custbody_shipping_credit_ref_no');
							var CreditReferenceNo=loadRecord.getFieldValue('tranid');
							CreditReferenceNo=nlapiEscapeXML(CreditReferenceNo);
							nlapiLogExecution('DEBUG', 'CreditReferenceNo', CreditReferenceNo);
							
							//create date
							var newdate = new Date();
							//load userpreferences
							var Setpreference = nlapiLoadConfiguration('userpreferences');
							//get dateFormat
							var dateFormat = 'YYYY-MM-DD';
							//get timeZone
							var timeZone = Setpreference.getFieldValue('TIMEZONE');
							//format date using time zone and dateformat
							var formatdate =moment(newdate).tz(timeZone).format(dateFormat);
							
							var PickupDate=formatdate;
							PickupDate=nlapiEscapeXML(PickupDate);
							
							
							var newTime = newdate.getTime()
							//nlapiLogExecution('DEBUG', 'newTime', newTime);
							
							var Current_Time =	moment(newTime).tz(timeZone).format("HHmm");
							
							
							
							var PickupTime=Current_Time;
							PickupTime=nlapiEscapeXML(PickupTime);
							
							
							
							var ItemCount = loadRecord.getLineItemCount('item');
							ItemCount=nlapiEscapeXML(ItemCount);
							nlapiLogExecution('DEBUG','ItemCount',ItemCount);
							nlapiLogExecution('DEBUG','PickupDate',PickupDate);
							nlapiLogExecution('DEBUG','PickupTime',PickupTime);
							
							var Eline;
							var Item="";
							var Price="";
							var Name="";
							var taxcode;
							var item_string="";
							var item_price_total=0;
							var item_quantity_total=0;
							var item_quantity=0;
							var is_item_fulfil=""
							var line_item_weight=0;
							var product_weight=0;
							var product_weight_total=0;
							var unit_price=0;
							var unit_price_total=0;
							for(Eline=1;Eline<=ItemCount;Eline++)
							{
								is_item_fulfil=loadRecord.getLineItemValue('item', 'itemreceive', Eline);
								//nlapiLogExecution('DEBUG','is_item_fulfil',is_item_fulfil);
								if(is_item_fulfil=="T")
								{
									Item = loadRecord.getLineItemValue('item', 'itemname', Eline);		Item = nlapiEscapeXML(Item); 
									Price = loadRecord.getLineItemValue('item', 'itemfxamount', Eline);
									Name = loadRecord.getLineItemValue('item', 'itemdescription', Eline);  Name = nlapiEscapeXML(Name); 
									if(nullCheck(Name))
									{
										Name=Name;
									}
									else
									{
										Name="";
									}										
									item_quantity = loadRecord.getLineItemValue('item', 'quantity', Eline);
									//nlapiLogExecution('DEBUG','item_quantity',item_quantity);
									line_item_weight = loadRecord.getLineItemValue('item', 'custcol_line_item_weight', Eline);
									//nlapiLogExecution('DEBUG','line_item_weight',line_item_weight);
									item_string += Name+' : '+ Price+' : '+Item;
									
									
									ItemDetailsString += '<sapi:ItemDetails>';
										ItemDetailsString += '<sapi:ItemID>'+Item+'</sapi:ItemID>';
										ItemDetailsString += '<sapi:ItemName>'+Name+'</sapi:ItemName>';
										ItemDetailsString += '<sapi:ItemValue>'+Price+'</sapi:ItemValue>';
									ItemDetailsString += '</sapi:ItemDetails>';
									
									
									
									
									//Commodity += Name
									if(Eline <ItemCount)
									{
										item_string +=","
										//Commodity +=","
									}
									//unit_price = loadRecord.getLineItemValue('item', 'custcol_final_unit_price', Eline);									
									//unit_price_total=(parseFloat(item_quantity)*parseFloat(unit_price)).toFixed(2);									
									//item_price_total=parseFloat(parseFloat(item_price_total)+parseFloat(unit_price_total)).toFixed(2);
									item_quantity_total=parseFloat(parseFloat(item_quantity_total)+parseFloat(item_quantity)).toFixed(0);								
									product_weight= (parseFloat(parseFloat(item_quantity)*parseFloat(line_item_weight))/1000).toFixed(2);//parseFloat((item_quantity)*parseFloat(line_item_weight))/1000;														
									product_weight_total= parseFloat(parseFloat(product_weight_total)+parseFloat(product_weight)).toFixed(2);//parseFloat(product_weight_total)+parseFloat(product_weight);//).toFixed(2);      
											
								}
							}
							item_string=nlapiEscapeXML(item_string);
							Commodity=nlapiEscapeXML(Commodity);
                          
                            var invoice_amount=loadRecord.getFieldValue('custbody_declared_value');
                            if(nullCheck(invoice_amount))
							{
								invoice_amount=invoice_amount;
							}
							else
							{
								invoice_amount=sales_total;
							}	
							//if(SubProductCode=="P")
							//{
								DeclaredValue=invoice_amount;//"2099.10";
							//}
							//else
							//{
								//DeclaredValue="0.00";
							//}	
							// DeclaredValue="2099.10"; 
							//PieceCount=item_quantity_total;//"1";	
							PieceCount="1";	
							nlapiLogExecution('DEBUG','product_weight_total',product_weight_total);
							ActualWeight=product_weight_total //"1.2";	
							// ActualWeight="1.2";	
							//if(SubProductCode=="C")
							//{
								CollactableAmount=invoice_amount;
							//}
							//else
							//{
								//CollactableAmount="0.00";
							//}			
							DeclaredValue=nlapiEscapeXML(DeclaredValue);   
							PieceCount=nlapiEscapeXML(PieceCount);   
							ActualWeight=nlapiEscapeXML(ActualWeight);   
							CollactableAmount=nlapiEscapeXML(CollactableAmount);   
							nlapiLogExecution('DEBUG','item_string',item_string);
							nlapiLogExecution('DEBUG','Commodity',Commodity);
							nlapiLogExecution('DEBUG','DeclaredValue',DeclaredValue);
							nlapiLogExecution('DEBUG','PieceCount',PieceCount);
							nlapiLogExecution('DEBUG','ActualWeight',ActualWeight);			
							nlapiLogExecution('DEBUG','CollactableAmount',CollactableAmount);			
							var packaging_box=loadRecord.getFieldValue('custbody_packaging_box_type');
							var packaging_box_fields=['custrecord_ship_box_length','custrecord_ship_box_width','custrecord_ship_box_height','custrecord_shipper_wt'];
							var Length="";
							var Breadth="";
							var Height="";
							var Count="1";
							var box_type_weight=0;
							Count=nlapiEscapeXML(Count); 
							if(nullCheck(packaging_box))
							{
								var get_packaging_box_fields = nlapiLookupField('customrecord_ns_shipping_package_type', packaging_box, packaging_box_fields);
								Length=get_packaging_box_fields.custrecord_ship_box_length;
								Length=nlapiEscapeXML(Length); 
								Breadth=get_packaging_box_fields.custrecord_ship_box_width;
								Breadth=nlapiEscapeXML(Breadth); 
								Height=get_packaging_box_fields.custrecord_ship_box_height;		
								Height=nlapiEscapeXML(Height); 
								var mode= columnsfields.custrecord_ns_shipping_mode;
								box_type_weight=get_packaging_box_fields.custrecord_shipper_wt;
								var mode_type=""
								if(mode==1)
								{
									mode_type="S";
								}
								else
								{
									mode_type="P";
								}
								mode_type=nlapiEscapeXML(mode_type); 	
								var api_type=mode_type;
								
								var Licence_key = columnsfields.custrecord_ns_ship_tracking_api ;
								Licence_key=nlapiEscapeXML(Licence_key);
								var LoginID = columnsfields.custrecord_ns_ship_login_id;
								LoginID=nlapiEscapeXML(LoginID);
								var version=columnsfields.custrecord_soap_version;
								version=nlapiEscapeXML(version);
								var password=columnsfields.custrecord_blue_dart_password;
								password=nlapiEscapeXML(password);
								var Track_api =columnsfields.custrecord_ns_ship_licence_key ;	
								Track_api=nlapiEscapeXML(Track_api);
								
								nlapiLogExecution('DEBUG','box_type_weight',box_type_weight);
								nlapiLogExecution('DEBUG','ActualWeight',ActualWeight);
								ActualWeight_total_final=parseFloat(box_type_weight)+parseFloat(ActualWeight);
								ActualWeight_total_final=nlapiEscapeXML(ActualWeight_total_final);
								nlapiLogExecution('DEBUG','ActualWeight_total_final',ActualWeight_total_final);
								nlapiLogExecution('DEBUG', 'api_type', api_type);	
								nlapiLogExecution('DEBUG', 'Count', Count);	
								nlapiLogExecution('DEBUG', 'Length', Length);	
								nlapiLogExecution('DEBUG', 'Breadth', Breadth);	
								nlapiLogExecution('DEBUG', 'Height', Height);
								
								nlapiLogExecution('DEBUG', 'Licence_key', Licence_key);	
								nlapiLogExecution('DEBUG', 'LoginID', LoginID);	
								nlapiLogExecution('DEBUG', 'version', version);	
								nlapiLogExecution('DEBUG', 'password', password);
								nlapiLogExecution('DEBUG', 'Track_api', Track_api);		   		


								var headers ="";
								
								if(api_type=="P")
								{
									headers = WayBillGeneration_HeaderProduction();
								}
								else
								{
									headers = WayBillGeneration_HeaderSandbox();
								}	

								
								var is_error="";
								//way_bill_no="";
								if(nullCheck(OriginArea) && nullCheck(Customer_code) && nullCheck(CustomerName)&&nullCheck(CustomerAddress1)&&nullCheck(CustomerPincode)&&nullCheck(IsToPayCustomer)&&nullCheck(ConsigneeName)&&nullCheck(ConsigneeAddress1)&&nullCheck(ConsigneePincode)&&nullCheck(ConsigneeMobile)&&nullCheck(ProductCode)&&nullCheck(RegisterPickup)&&nullCheck(SubProductCode)&&nullCheck(ProductType)&&nullCheck(PieceCount)&&nullCheck(ActualWeight_total_final)&& nullCheck(CreditReferenceNo) && nullCheck(DeclaredValue) && nullCheck(PickupDate)&& nullCheck(PickupTime)&&nullCheck(ItemCount) && nullCheck(item_string) && nullCheck(api_type) && nullCheck(Licence_key)&&nullCheck(LoginID) && nullCheck(version) && nullCheck(password) && nullCheck(Length) && nullCheck(Breadth)&& nullCheck(Height)&& nullCheck(Count) && nullCheck(CollactableAmount) && nullCheck(Track_api) && nullCheck(liveAPIBluDart)&& nullCheck(demoAPIBluDart) )
								{			
									var body ="";
									
									
									var soapHead = {};
									soapHead['Content-Type'] = 'application/soap+xml; charset=utf-8';
									soapHead['SOAPAction'] = 'http://tempuri.org/IWayBillGeneration/GenerateWayBill';
									
									if(api_type=="P")
									{
										//url ="https://netconnect.bluedart.com/Ver1.8/ShippingAPI/WayBill/WayBillGeneration.svc";
										url = liveAPIBluDart;
										body = WayBillGeneration_BodyProduction(OriginArea,Customer_code,CustomerName,CustomerAddress1,CustomerAddress2,CustomerAddress3,CustomerPincode,IsToPayCustomer,ConsigneeName,ConsigneeAddress1,ConsigneeAddress2,ConsigneeAddress3, ConsigneePincode,ConsigneeMobile,ProductCode,RegisterPickup,SubProductCode,ProductType,PieceCount,ActualWeight_total_final,CreditReferenceNo,DeclaredValue,PickupDate,PickupTime,ItemCount,item_string,api_type,Licence_key,LoginID,version,password,Length, Breadth, Height, Count,CollactableAmount,Track_api,pack_type,CustomerMobile,special_instruction,CustomerTelephone,Commodity,ItemDetailsString,sales_tran_id);
										
										
									}
									else
									{
										//url ="https://netconnect.bluedart.com/Ver1.7/Demo/ShippingAPI/WayBill/WayBillGeneration.svc";
										
										url = demoAPIBluDart;
										body = WayBillGeneration_BodySandbox(OriginArea,Customer_code,CustomerName,CustomerAddress1,CustomerAddress2,CustomerAddress3,CustomerPincode,IsToPayCustomer,ConsigneeName,ConsigneeAddress1,ConsigneeAddress2,ConsigneeAddress3, ConsigneePincode,ConsigneeMobile,ProductCode,RegisterPickup,SubProductCode,ProductType,PieceCount,ActualWeight_total_final,CreditReferenceNo,DeclaredValue,PickupDate,PickupTime,ItemCount,item_string,api_type,Licence_key,LoginID,version,password,Length, Breadth, Height, Count,CollactableAmount,Track_api,pack_type,CustomerMobile,special_instruction,CustomerTelephone,Commodity,ItemDetailsString,sales_tran_id);
									}	
									
									
									
									
							
									 
									
									
									var soapPayload = WayBillGeneration_BuildEnvelope(headers + body);
									
									
									
									
									
									
									
									
									
									
									
									// var soapHead = {};
									// soapHead['Content-Type'] = 'text/xml';
									
									// if(api_type=="P")
									// {
										// soapHead['SOAPAction'] = '"http://MyBlueDartServiceProduction.org/WayBillGenerationProductionFun"';
										// url +="WayBillGenProduction.asmx";
									// }
									// else 
									// {
										// soapHead['SOAPAction'] = '"http://MyBlueDartServiceSandBox.org/WayBillGenerationSandBoxFun"';
										// url +="WayBillGen.asmx";
									// }
									
									
									
									nlapiLogExecution('DEBUG', 'soapPayload', JSON.stringify(soapPayload));
									nlapiLogExecution('DEBUG', 'soapHead', JSON.stringify(soapHead));
									nlapiLogExecution('DEBUG', 'url', JSON.stringify(url));
									
									var response1 = nlapiRequestURL(url, soapPayload, soapHead); 
									nlapiLogExecution('DEBUG', 'response1', response1); 			
									var responseXML = nlapiStringToXML(response1.getBody());
									nlapiLogExecution('DEBUG', 'responseXML', responseXML); 
									var string = response1.getBody().toString();
									nlapiLogExecution('DEBUG', 'string', string);
									nlapiLogExecution('DEBUG', 'getCode', response1.getCode());
									if(nullCheck(string))
									{
										var VIsError =string.split('<b:IsError>').pop().split('</b:IsError>')[0];
										nlapiLogExecution('DEBUG', 'VIsError', VIsError);
										if(nullCheck(VIsError))
										{										
											if(VIsError =="false")
											{
												var VAwbNo =string.split('<b:AWBNo>').pop().split('</b:AWBNo>')[0];
												nlapiLogExecution('DEBUG', 'VAwbNo', VAwbNo);					
												var VAWBPrintContent =string.split('<b:AWBPrintContent>').pop().split('</b:AWBPrintContent>')[0];
												loadRecord.setFieldValue('custbody_way_bill_number',VAwbNo);					
												var fileObj = nlapiCreateFile(VAwbNo,"PDF",VAWBPrintContent);					
												fileObj.setFolder(pdf_folder);
												fileObj.setIsOnline(true);   
												var fileId = nlapiSubmitFile(fileObj);
												if(nullCheck(fileId))
												{	
													loadRecord.setFieldValue('custbody_bluedart_waybill_invoice',fileId);
												}
												
											}
											else if(VIsError =="true")
											{
												var VStatusInformation =string.split('<b:StatusInformation>').pop().split('</b:StatusInformation>')[0];					
												loadRecord.setFieldValue('custbody_way_bill_number',VStatusInformation);
											}
											
											// var parts=[];
											// parts = string.split(" - ");
											// var part1 = parts[0]; 
											// var part2 = parts[1]; 
											// var part3 = parts[2]; 
											// var finals=[];
											// finals=part1.split("<WayBillGenerationFunResult>");
											// is_error=finals[1];
											// if(nullCheck(part2))
											// {
												// if(is_error=="False")
												// {
													// way_bill_no=part2;
												// }
												// else
												// {
													// way_bill_no=part2.split('</WayBillGenerationFunResult>')
												// }	
											// }
											// nlapiLogExecution('DEBUG', 'getCode', response1.getCode());   
											// nlapiLogExecution('DEBUG', 'getBody', response1.getBody());   	
											// nlapiLogExecution('DEBUG', 'part1', JSON.stringify(part1));   	
											// nlapiLogExecution('DEBUG', 'part2', JSON.stringify(part2));   	
											// nlapiLogExecution('DEBUG', 'part3', JSON.stringify(part3));   	
											// nlapiLogExecution('DEBUG', 'is_error', JSON.stringify(is_error)); 
										}
									}
								}	
							}	
						}
					}	
				}
			}				
	  }	
	  var fulfill_Status = loadRecord.getFieldValue('shipstatus');
	  if(fulfill_Status=="C")
	  {	
		var packageItemCount = loadRecord.getLineItemCount('package');
		if(nullCheck(packageItemCount) && packageItemCount > 0) 
		{
			for (i = 1; i <= packageItemCount; i++) 
			{
				loadRecord.setLineItemValue('package', 'packagetrackingnumber', i, Way_bill_no);
			}
		}
	  }
	  /*loadRecord.setFieldValue('custbody_shipment_piece_count',PieceCount);
	  loadRecord.setFieldValue('custbody_actual_we',ActualWeight);
	  loadRecord.setFieldValue('custbody_declared_value',DeclaredValue);*/
	   nlapiSubmitRecord(loadRecord,false, true);
	}

	}
	catch(ex)
	{
		var errorStr = (ex.getCode != null) ? ex.getCode() + '<br>' + ex.getDetails() + '<br>' + ex.getStackTrace().join('<br>') : ex.toString();
		nlapiLogExecution('Debug', 'eis_report_form_suitelet', 'eis_report_form_suitelet : ' + '<br>' + errorStr);

		var ErrorMessage='Service is unavailable. Please try after sometime for waybill generation. \n' + errorStr;		
		//nlapiSubmitField(recType, recId, 'custbody_way_bill_number', ErrorMessage, true);

		throw ErrorMessage;
		
	
		//loadRecord.setFieldValue('custbody_way_bill_number',errorStr);	
	}
}


function WayBillGeneration_HeaderSandbox()
{
	var soap1 = null;
		soap1  = '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">';
		soap1  += '<wsa:To>https://netconnect.bluedart.com/Ver1.7/Demo/ShippingAPI/WayBill/WayBillGeneration.svc</wsa:To>';
		soap1  += '<wsa:Action>http://tempuri.org/IWayBillGeneration/GenerateWayBill</wsa:Action>';
		soap1  += '</soap:Header>';
	
		return soap1;
}


function WayBillGeneration_HeaderProduction()
{
	var soap1 = null;
		soap1  = '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">';
		soap1  += '<wsa:To>https://netconnect.bluedart.com/Ver1.8/ShippingAPI/WayBill/WayBillGeneration.svc</wsa:To>';
		soap1  += '<wsa:Action>http://tempuri.org/IWayBillGeneration/GenerateWayBill</wsa:Action>';
		soap1  += '</soap:Header>';
	
		return soap1;
}


function WayBillGeneration_BodySandbox(OriginArea,Customer_code,CustomerName,CustomerAddress1,CustomerAddress2,CustomerAddress3,CustomerPincode,IsToPayCustomer,ConsigneeName,ConsigneeAddress1,ConsigneeAddress2,ConsigneeAddress3,ConsigneePincode,ConsigneeMobile,ProductCode,RegisterPickup,SubProductCode,ProductType,PieceCount,ActualWeight,CreditReferenceNo,DeclaredValue,PickupDate,PickupTime,ItemCount,item_string,api_type,Licence_key,LoginID,version,password,Length, Breadth, Height, Count,CollactableAmount,Track_api,pack_type,CustomerMobile,special_instruction,CustomerTelephone,Commodity,ItemDetailsString,invoice_no)
{
	
	var soap2 = null;
	
	soap2  = '<soap:Body>';
		  soap2  += '<tem:GenerateWayBill>';
			 
			 soap2  += '<tem:Request>';
				
				soap2  += '<sapi:Consignee>';
					soap2 += '<sapi:ConsigneeAddress1>'+ConsigneeAddress1.slice(0, 30)+'</sapi:ConsigneeAddress1>';
					soap2 += '<sapi:ConsigneeAddress2>'+ConsigneeAddress2.slice(0, 30)+'</sapi:ConsigneeAddress2>';
					soap2 += '<sapi:ConsigneeAddress3>'+ConsigneeAddress3.slice(0, 30)+'</sapi:ConsigneeAddress3>';
					soap2 += '<sapi:ConsigneeMobile>'+ConsigneeMobile.slice(0, 15)+'</sapi:ConsigneeMobile>';
					soap2 += '<sapi:ConsigneeName>'+ConsigneeName.slice(0, 30)+'</sapi:ConsigneeName>';
					soap2 += '<sapi:ConsigneePincode>'+ConsigneePincode.slice(0, 6)+'</sapi:ConsigneePincode>';
					//soap2 == '<sapi:ConsigneeTelephone>1324567897</sapi:ConsigneeTelephone>';
				   
				soap2  += '</sapi:Consignee>';
				
				
				soap2  += '<sapi:Services>';
				
					soap2 += '<sapi:ActualWeight>'+ActualWeight.slice(0, 11)+'</sapi:ActualWeight>';
					if(SubProductCode == "C")
					{
						soap2 += '<sapi:CollectableAmount>'+CollactableAmount.slice(0, 13)+'</sapi:CollectableAmount>';
					}
					soap2 += '<sapi:CreditReferenceNo>'+CreditReferenceNo.slice(0, 20)+'</sapi:CreditReferenceNo>';
					soap2 += '<sapi:DeclaredValue>'+DeclaredValue.slice(0, 13)+'</sapi:DeclaredValue>';
					soap2 += '<sapi:Dimensions>';
						soap2 += '<sapi:Dimension>';
							soap2 += '<sapi:Breadth>'+Breadth.slice(0, 9)+'</sapi:Breadth>';
							soap2 += '<sapi:Count>'+Count+'</sapi:Count>';
							soap2 += '<sapi:Height>'+Height.slice(0, 9)+'</sapi:Height>';
							soap2 += '<sapi:Length>'+Length.slice(0, 9)+'</sapi:Length>';
						soap2 += '</sapi:Dimension>';
					soap2 += '</sapi:Dimensions>';
					
					soap2 += '<sapi:ItemCount>'+ItemCount+'</sapi:ItemCount>';
					
					soap2 += '<sapi:PackType>'+pack_type.slice(0, 1)+'</sapi:PackType>';	
					
					soap2 += '<sapi:PickupDate>'+PickupDate+'</sapi:PickupDate>';
					soap2 += '<sapi:PickupTime>'+PickupTime+'</sapi:PickupTime>';
					soap2 += '<sapi:PieceCount>'+PieceCount.slice(0, 1)+'</sapi:PieceCount>';
					soap2 += '<sapi:ProductCode>'+ProductCode.slice(0, 1)+'</sapi:ProductCode>';
					soap2 += '<sapi:RegisterPickup>'+RegisterPickup+'</sapi:RegisterPickup>';
					
					soap2 += '<sapi:SpecialInstruction>'+special_instruction.slice(0, 50)+'</sapi:SpecialInstruction>';
					
					soap2 += '<sapi:SubProductCode>'+SubProductCode.slice(0, 1)+'</sapi:SubProductCode>';
					
					soap2 += '<sapi:itemdtl>';
						soap2 += ItemDetailsString;
						soap2  += '<sapi:InvoiceNo>'+invoice_no+'</sapi:InvoiceNo>';	
					soap2 += ' </sapi:itemdtl>';
					
					
					//WayBillString += '<sapi:ProductType>ProductType.Dutiables</sapi:ProductType>';
					
					
					
					
					
				   
				soap2  += '</sapi:Services>';
					
				soap2  += '<sapi:Shipper>';
				
					soap2 += ' <sapi:CustomerAddress1>'+CustomerAddress1.slice(0, 30)+'</sapi:CustomerAddress1>';
					soap2 += '<sapi:CustomerAddress2>'+CustomerAddress2.slice(0, 30)+'</sapi:CustomerAddress2>';
					soap2 += '<sapi:CustomerAddress3>'+CustomerAddress3.slice(0, 30)+'</sapi:CustomerAddress3>';
					
					soap2 += '<sapi:CustomerCode>'+Customer_code.slice(0, 6)+'</sapi:CustomerCode>';
					soap2 += '<sapi:CustomerMobile>'+CustomerMobile.slice(0, 15)+'</sapi:CustomerMobile>';
					soap2 += '<sapi:CustomerName>'+CustomerName.slice(0, 30)+'</sapi:CustomerName>';	
					soap2 += '<sapi:CustomerPincode>'+CustomerPincode.slice(0, 6)+'</sapi:CustomerPincode>';
					soap2 += '<sapi:IsToPayCustomer>'+IsToPayCustomer+'</sapi:IsToPayCustomer>';
					soap2 += ' <sapi:OriginArea>'+OriginArea.slice(0, 3)+'</sapi:OriginArea>';
					soap2 += '<sapi:CustomerTelephone>'+CustomerTelephone.slice(0, 15)+'</sapi:CustomerTelephone>';
				soap2  += '</sapi:Shipper>';
			 soap2  += '</tem:Request>';
			 
			 soap2  += '<tem:Profile>';
				
					
				soap2  += '<sapi1:Api_type>S</sapi1:Api_type>';
				soap2  += '<sapi1:Customercode>'+Customer_code+'</sapi1:Customercode>';
				soap2  += '<sapi1:LicenceKey>'+Licence_key+'</sapi1:LicenceKey>';
				soap2  += '<sapi1:LoginID>'+LoginID+'</sapi1:LoginID>';
				soap2  += '<sapi1:Password>'+password+'</sapi1:Password>';
				soap2  += '<sapi1:Version>'+version+'</sapi1:Version>';
				
			 soap2  += '</tem:Profile>';
			 
		  soap2  += '</tem:GenerateWayBill>';
		  
	   soap2  += '</soap:Body>';
	
	return soap2;
	
	
	
	
	
 	// var soap = null;
 	// soap = '\t<soap:Body>\n';
	
			// if(api_type=="P")
			// {
				// soap += '\t\t<WayBillGenerationProductionFun xmlns="http://MyBlueDartServiceProduction.org/">\n';
			// }
			// else 
			// {
				// soap += '\t\t<WayBillGenerationSandBoxFun xmlns="http://MyBlueDartServiceSandBox.org/">\n';
			// }
	
	
 		
		
		// soap +='\t\t\t<VOriginArea>'+OriginArea+'</VOriginArea>\n'	;
		
		// soap +='\t\t\t<VCustomerCode>'+Customer_code+'</VCustomerCode>\n';
		
		// soap +='\t\t\t<VCustName>'+CustomerName+'</VCustName>\n'	;
		
		// soap +='\t\t\t<VCustAdd1>'+CustomerAddress1+'</VCustAdd1>\n';
		
		// soap +='\t\t\t<VCustAdd2>'+CustomerAddress2+'</VCustAdd2>\n'	;
		
		// soap +='\t\t\t<VCustAdd3>'+CustomerAddress3+'</VCustAdd3>\n';
		
		// soap +='\t\t\t<VCustPincode>'+CustomerPincode+'</VCustPincode>\n'	;
		
		// soap +='\t\t\t<VIsPayToCust>'+IsToPayCustomer+'</VIsPayToCust>\n';
		
		// //soap +='\t\t\t<VConsignee>'++'</VConsignee>\n'	;
		
		// soap +='\t\t\t<VConsName>'+ConsigneeName+'</VConsName>\n';
		
		// soap +='\t\t\t<VConsAdd>'+ConsigneeAddress1+'</VConsAdd>\n'	;
		
		// soap +='\t\t\t<VConsAdd2>'+ConsigneeAddress2+'</VConsAdd2>\n';
		
		// soap +='\t\t\t<VConsAdd3>'+ConsigneeAddress3+'</VConsAdd3>\n'	;
		
		// soap +='\t\t\t<VConsPincode>'+ConsigneePincode+'</VConsPincode>\n';
		
		// soap +='\t\t\t<VConMobile>'+ConsigneeMobile+'</VConMobile>\n'	;
		
		// soap +='\t\t\t<VProductCode>'+ProductCode+'</VProductCode>\n';
		
		// soap +='\t\t\t<VRegisterPickUp>'+RegisterPickup+'</VRegisterPickUp>\n'	;
		
		// soap +='\t\t\t<VSubProductCode>'+SubProductCode+'</VSubProductCode>\n';
		
		// soap +='\t\t\t<VProductType>'+ProductType+'</VProductType>\n'	;
		
		// soap +='\t\t\t<VPieceCount>'+PieceCount+'</VPieceCount>\n';
		
		// soap +='\t\t\t<VActualWeight>'+ActualWeight+'</VActualWeight>\n'	;
		
		// soap +='\t\t\t<VCrRefNo>'+CreditReferenceNo+'</VCrRefNo>\n';
		
		// soap +='\t\t\t<VDeclaredValue>'+DeclaredValue+'</VDeclaredValue>\n'	;
		
		// soap +='\t\t\t<VPickUpDate>'+PickupDate+'</VPickUpDate>\n';
		
		// soap +='\t\t\t<VPickUpTime>'+PickupTime+'</VPickUpTime>\n'	;
		
		// soap +='\t\t\t<VItemCount>'+ItemCount+'</VItemCount>\n';
		
		// soap +='\t\t\t<VItemDetails>'+item_string+'</VItemDetails>\n'	;
		
		// soap +='\t\t\t<VLength>'+Length+'</VLength>\n'	;
		
		// soap +='\t\t\t<VBreadth>'+Breadth+'</VBreadth>\n'	;
		
		// soap +='\t\t\t<VHeight>'+Height+'</VHeight>\n'	;
		
		// soap +='\t\t\t<VCount>'+Count+'</VCount>\n'	;
		
		// soap +='\t\t\t<VAPIType>'+api_type+'</VAPIType>\n';
		
		// soap +='\t\t\t<VCustCodeLic>'+Customer_code+'</VCustCodeLic>\n'	;
		
		// if(api_type=="P")
		// {
			// soap +='\t\t\t<VLicKey>'+Track_api+'</VLicKey>\n';
		// }
		// else
		// {
			// soap +='\t\t\t<VLicKey>'+Licence_key+'</VLicKey>\n';
		// }	
		
		
		
		// soap +='\t\t\t<VLoginID>'+LoginID+'</VLoginID>\n'	;
		
		// soap +='\t\t\t<VVersion>'+version+'</VVersion>\n';
		
		// soap +='\t\t\t<VPwd>'+password+'</VPwd>\n';
		
		// soap +='\t\t\t<VCollectableAmt>'+CollactableAmount+'</VCollectableAmt>\n';
		
		// soap +='\t\t\t<VPakcType>'+pack_type+'</VPakcType>\n';
		
		// soap +='\t\t\t<VCustMobile>'+CustomerMobile+'</VCustMobile>\n';
		
		// soap +='\t\t\t<VSplInst>'+special_instruction+'</VSplInst>\n';
		
		// soap +='\t\t\t<VCustTelephone>'+CustomerTelephone+'</VCustTelephone>\n';
		
		// soap +='\t\t\t<VCommodityDetails>'+Commodity+'</VCommodityDetails>\n';
		
		
		// if(api_type=="P")
		// {
			// soap += '\t\t</WayBillGenerationProductionFun>\n';
			
		// }
		// else 
		// {
			// soap += '\t\t</WayBillGenerationSandBoxFun>\n';
			
		// }
		
 		
 	// soap += '\t</soap:Body>\n';
 	
 	// return soap;
}


function WayBillGeneration_BodyProduction(OriginArea,Customer_code,CustomerName,CustomerAddress1,CustomerAddress2,CustomerAddress3,CustomerPincode,IsToPayCustomer,ConsigneeName,ConsigneeAddress1,ConsigneeAddress2,ConsigneeAddress3,ConsigneePincode,ConsigneeMobile,ProductCode,RegisterPickup,SubProductCode,ProductType,PieceCount,ActualWeight,CreditReferenceNo,DeclaredValue,PickupDate,PickupTime,ItemCount,item_string,api_type,Licence_key,LoginID,version,password,Length, Breadth, Height, Count,CollactableAmount,Track_api,pack_type,CustomerMobile,special_instruction,CustomerTelephone,Commodity,ItemDetailsString,invoice_no)
{
	
	var soap2 = null;
	
	soap2  = '<soap:Body>';
		  soap2  += '<tem:GenerateWayBill>';
			 
			 soap2  += '<tem:Request>';
				
				soap2  += '<sapi:Consignee>';
					soap2 += '<sapi:ConsigneeAddress1>'+nlapiEscapeXML(ConsigneeAddress1.slice(0, 30))+'</sapi:ConsigneeAddress1>';
					soap2 += '<sapi:ConsigneeAddress2>'+nlapiEscapeXML(ConsigneeAddress2.slice(0, 30))+'</sapi:ConsigneeAddress2>';
					soap2 += '<sapi:ConsigneeAddress3>'+nlapiEscapeXML(ConsigneeAddress3.slice(0, 30))+'</sapi:ConsigneeAddress3>';
					soap2 += '<sapi:ConsigneeMobile>'+ConsigneeMobile.slice(0, 15)+'</sapi:ConsigneeMobile>';
					soap2 += '<sapi:ConsigneeName>'+nlapiEscapeXML(ConsigneeName.slice(0, 30))+'</sapi:ConsigneeName>';
					soap2 += '<sapi:ConsigneePincode>'+ConsigneePincode.slice(0, 6)+'</sapi:ConsigneePincode>';
					//soap2 == '<sapi:ConsigneeTelephone>1324567897</sapi:ConsigneeTelephone>';
				   
				soap2  += '</sapi:Consignee>';
				
  				soap2  += '<sapi:Returnadds>'; 
					soap2 += ' <sapi:ReturnAddress1>'+nlapiEscapeXML(CustomerAddress1.slice(0, 30))+'</sapi:ReturnAddress1>';
					soap2 += '<sapi:ReturnAddress2>'+nlapiEscapeXML(CustomerAddress2.slice(0, 30))+'</sapi:ReturnAddress2>';
					soap2 += '<sapi:ReturnAddress3>'+nlapiEscapeXML(CustomerAddress3.slice(0, 30))+'</sapi:ReturnAddress3>';
					soap2 += '<sapi:ReturnAddressinfo></sapi:ReturnAddressinfo>';
					soap2 += '<sapi:ReturnContact>'+nlapiEscapeXML(CustomerName.slice(0, 20))+'</sapi:ReturnContact>';
					soap2 += '<sapi:ReturnEmailID></sapi:ReturnEmailID>';
					soap2 += '<sapi:ReturnMobile>'+CustomerMobile.slice(0, 15)+'</sapi:ReturnMobile>';	
					soap2 += '<sapi:ReturnPincode>'+CustomerPincode.slice(0, 6)+'</sapi:ReturnPincode>';
					soap2 += '<sapi:ReturnTelephone>'+CustomerMobile.slice(0, 15)+'</sapi:ReturnTelephone>';
				soap2  += '</sapi:Returnadds>';

				
				soap2  += '<sapi:Services>';
				
					soap2 += '<sapi:ActualWeight>'+ActualWeight.slice(0, 11)+'</sapi:ActualWeight>';
					if(SubProductCode == "C")
					{
						soap2 += '<sapi:CollectableAmount>'+CollactableAmount.slice(0, 13)+'</sapi:CollectableAmount>';
					}
					soap2 += '<sapi:Commodity>';
						soap2 += '<sapi:CommodityDetail1></sapi:CommodityDetail1>';
						soap2 += '<sapi:CommodityDetail2></sapi:CommodityDetail2>';
						soap2 += '<sapi:CommodityDetail3></sapi:CommodityDetail3>';
					soap2 +='</sapi:Commodity>';
					soap2 += '<sapi:CreditReferenceNo>'+CreditReferenceNo.slice(0, 20)+'</sapi:CreditReferenceNo>';
					soap2 += '<sapi:DeclaredValue>'+DeclaredValue.slice(0, 13)+'</sapi:DeclaredValue>';
					soap2 += '<sapi:Dimensions>';
						soap2 += '<sapi:Dimension>';
							soap2 += '<sapi:Breadth>'+Breadth.slice(0, 9)+'</sapi:Breadth>';
							soap2 += '<sapi:Count>'+Count+'</sapi:Count>';
							soap2 += '<sapi:Height>'+Height.slice(0, 9)+'</sapi:Height>';
							soap2 += '<sapi:Length>'+Length.slice(0, 9)+'</sapi:Length>';
						soap2 += '</sapi:Dimension>';
					soap2 += '</sapi:Dimensions>';
					soap2 += '<sapi:ItemCount>'+ItemCount+'</sapi:ItemCount>';
					soap2 += '<sapi:PackType>'+pack_type.slice(0, 1)+'</sapi:PackType>';
					soap2 += '<sapi:PickupDate>'+PickupDate+'</sapi:PickupDate>';
					soap2 += '<sapi:PickupTime>'+PickupTime+'</sapi:PickupTime>';
					soap2 += '<sapi:PieceCount>'+PieceCount.slice(0, 1)+'</sapi:PieceCount>';
					soap2 += '<sapi:ProductCode>'+ProductCode.slice(0, 1)+'</sapi:ProductCode>';
					soap2 += '<sapi:RegisterPickup>'+RegisterPickup+'</sapi:RegisterPickup>';
					soap2 += '<sapi:SpecialInstruction>'+nlapiEscapeXML(special_instruction.slice(0, 50))+'</sapi:SpecialInstruction>';
					soap2 += '<sapi:SubProductCode>'+SubProductCode.slice(0, 1)+'</sapi:SubProductCode>';
					soap2 += '<sapi:itemdtl>';
						soap2 += ItemDetailsString;
						soap2  += '<sapi:InvoiceNo>'+invoice_no+'</sapi:InvoiceNo>';	
					soap2 += ' </sapi:itemdtl>';
					
					
					//WayBillString += '<sapi:ProductType>ProductType.Dutiables</sapi:ProductType>';
					
					
					
					
					
					
				   
				soap2  += '</sapi:Services>';
					
				soap2  += '<sapi:Shipper>';
				
					soap2 += ' <sapi:CustomerAddress1>'+nlapiEscapeXML(CustomerAddress1.slice(0, 30))+'</sapi:CustomerAddress1>';
					soap2 += '<sapi:CustomerAddress2>'+nlapiEscapeXML(CustomerAddress2.slice(0, 30))+'</sapi:CustomerAddress2>';
					soap2 += '<sapi:CustomerAddress3>'+nlapiEscapeXML(CustomerAddress3.slice(0, 30))+'</sapi:CustomerAddress3>';
					
					soap2 += '<sapi:CustomerCode>'+Customer_code.slice(0, 6)+'</sapi:CustomerCode>';
					soap2 += '<sapi:CustomerMobile>'+CustomerMobile.slice(0, 15)+'</sapi:CustomerMobile>';
					soap2 += '<sapi:CustomerName>'+nlapiEscapeXML(CustomerName.slice(0, 30))+'</sapi:CustomerName>';	
					soap2 += '<sapi:CustomerPincode>'+CustomerPincode.slice(0, 6)+'</sapi:CustomerPincode>';
					soap2 += '<sapi:CustomerTelephone>'+CustomerTelephone.slice(0, 15)+'</sapi:CustomerTelephone>';
					soap2 += '<sapi:IsToPayCustomer>'+IsToPayCustomer+'</sapi:IsToPayCustomer>';
					soap2 += ' <sapi:OriginArea>'+OriginArea.slice(0, 3)+'</sapi:OriginArea>';
					
				soap2  += '</sapi:Shipper>';

				//Begin : CR/Issue : 18.1.2020 - Return Address Issue, Parameter name change from 'ReturnAddress' to 'Returnadds', 12.2.2020- All Parameters added and sequence rearranged.
				
				/* soap2  += '<sapi:ReturnAddress>'; //CR/Issue : 18.1.2020 - Return Address Issue- commented this code and added below
				
					soap2 += ' <sapi:ReturnAddress1>'+nlapiEscapeXML(ConsigneeAddress1.slice(0, 30))+'</sapi:ReturnAddress1>';
					soap2 += '<sapi:ReturnAddress2>'+nlapiEscapeXML(ConsigneeAddress2.slice(0, 30))+'</sapi:ReturnAddress2>';
					soap2 += '<sapi:ReturnAddress3>'+nlapiEscapeXML(ConsigneeAddress3.slice(0, 30))+'</sapi:ReturnAddress3>';
					soap2 += '<sapi:ReturnPincode>'+ConsigneePincode.slice(0, 6)+'</sapi:ReturnPincode>';
					soap2 += '<sapi:ReturnMobile>'+ConsigneeMobile.slice(0, 30)+'</sapi:ReturnMobile>';	
					soap2 += '<sapi:ReturnContact>'+nlapiEscapeXML(ConsigneeName.slice(0, 30))+'</sapi:ReturnContact>';	
				soap2  += '</sapi:ReturnAddress>';
				
				soap2  += '<sapi:Returnadds>';  //moving this returnaddr  after consingee
					soap2 += ' <sapi:ReturnAddress1>'+nlapiEscapeXML(CustomerAddress1.slice(0, 30))+'</sapi:ReturnAddress1>';
					soap2 += '<sapi:ReturnAddress2>'+nlapiEscapeXML(CustomerAddress2.slice(0, 30))+'</sapi:ReturnAddress2>';
					soap2 += '<sapi:ReturnAddress3>'+nlapiEscapeXML(CustomerAddress3.slice(0, 30))+'</sapi:ReturnAddress3>';
					soap2 += '<sapi:ReturnAddressinfo></sapi:ReturnAddressinfo>';
					soap2 += '<sapi:ReturnContact>'+nlapiEscapeXML(CustomerName.slice(0, 20))+'</sapi:ReturnContact>';
					soap2 += '<sapi:ReturnEmailID></sapi:ReturnEmailID>';
					soap2 += '<sapi:ReturnMobile>'+CustomerMobile.slice(0, 15)+'</sapi:ReturnMobile>';	
					soap2 += '<sapi:ReturnPincode>'+CustomerPincode.slice(0, 6)+'</sapi:ReturnPincode>';
					soap2 += '<sapi:ReturnTelephone>'+CustomerMobile.slice(0, 15)+'</sapi:ReturnTelephone>';
				soap2  += '</sapi:Returnadds>';*/

				//End : CR/Issue : 18.1.2020 - Return Address Issue, Parameter name change from 'ReturnAddress' to 'Returnadds', 12.2.2020- All Parameters added and sequence rearranged.
				
				
			 soap2  += '</tem:Request>';
			 
			 soap2  += '<tem:Profile>';
				
					
						soap2  += '<sapi1:Api_type>S</sapi1:Api_type>';
						soap2  += '<sapi1:Customercode>'+Customer_code+'</sapi1:Customercode>';
						soap2  += '<sapi1:LicenceKey>'+Track_api+'</sapi1:LicenceKey>';
						soap2  += '<sapi1:LoginID>'+LoginID+'</sapi1:LoginID>';
						soap2  += '<sapi1:Password>'+password+'</sapi1:Password>';
						soap2  += '<sapi1:Version>'+version+'</sapi1:Version>';
				
			 soap2  += '</tem:Profile>';
			 
		  soap2  += '</tem:GenerateWayBill>';
		  
	   soap2  += '</soap:Body>';
	
	return soap2;
}




function WayBillGeneration_BuildEnvelope(actualcontents)
{
	// var soap = null;
	// soap = '<?xml version="1.0" encoding="utf-8"?>\n';
	// soap += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n';
		// soap += actualcontents;
	// soap += '</soap:Envelope>';
	// return soap;
	
	
	var soap3=null;
	
		soap3 ='<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/" xmlns:sapi="http://schemas.datacontract.org/2004/07/SAPI.Entities.WayBillGeneration" xmlns:sapi1="http://schemas.datacontract.org/2004/07/SAPI.Entities.Admin">';
		
		soap3 +=actualcontents;
		
		soap3 += '</soap:Envelope>';
		
		return soap3;
}

function Beforeload_WayBillGenerationfulfill(type)
{ 
try
	{
		var Way_bill_no=nlapiGetFieldValue('custbody_way_bill_number');
		if(type=="view" && nullCheck(Way_bill_no))
		{
			form.setScript('customscript_way_bill_generation_fulfiil');	
			form.addButton('custpage_waybilltrack', 'Track', 'WayBillTrackingFun()');
			//form.addButton('custpage_waybillprint', 'Print', 'WayBillPrint()');
		
			var LicKeyVar="";
			var LoginIDVar="";
			var Ship_Carrirr=nlapiGetFieldValue('custbody_ns_order_ship_carrier');
			var fulfill_Status=nlapiGetFieldValue('shipstatus');
			var Shipping_method=nlapiGetFieldValue('shipmethod');	
			var Ship_Carrirr_fields = ['custrecord_ns_ship_login_id', 'custrecord_ns_ship_licence_key','custrecord_ns_ship_tracking_api'];
			
			if(nullCheck(Ship_Carrirr))
			{
				var columnsfields = nlapiLookupField('customrecord_ns_ship_config', Ship_Carrirr, Ship_Carrirr_fields);
				
				 LicKeyVar=columnsfields.custrecord_ns_ship_tracking_api;
				 LoginIDVar = columnsfields.custrecord_ns_ship_login_id;
				
				nlapiLogExecution('Debug', 'LicKeyVar', LicKeyVar);
				nlapiLogExecution('Debug', 'LoginIDVar', LoginIDVar);
				
			}
	
			var Handeler="tnt";
			var action="custawbquery";
			var LoginID=LoginIDVar;
			var LicKey=LicKeyVar;
			var Version="1.3";
			var Scan="1";			
			
			var xmlFormat="xml";
			var xmlTrackURL="https://api.bluedart.com/servlet/RoutingServlet?handler="+Handeler+"&action="+action+"&loginid="+LoginID+"&lickey="+LicKey+"&verno="+Version+"&awb=awb&format="+xmlFormat+"&numbers="+Way_bill_no+"&scan="+Scan+"";
			nlapiLogExecution('Debug', 'xmlTrackURL From website', xmlTrackURL);
			var xmlresponse1 = nlapiRequestURL(xmlTrackURL, null, null); 
			
			nlapiLogExecution('Debug', 'xmlresponse1.getCode()', xmlresponse1.getCode());
			nlapiLogExecution('Debug', 'xmlresponse1', xmlresponse1);
			
			var xmlstring = xmlresponse1.getBody().toString();
			nlapiLogExecution('DEBUG', 'xmlstring', xmlstring);			
				
			var ship_status =xmlstring.split('<Status>').pop().split('</Status>')[0];
			if(fulfill_Status=="C" && Shipping_method==13)
			{
				
				form.addField('custpage_field1', 'inlinehtml', 'Ship Status' ).setDefaultValue('<span style="color:orange;font-size: large;"><B>'+ship_status+'</B></span>');	
				nlapiLogExecution('DEBUG', 'ship_status', ship_status);
			}		
		
		}
		nlapiGetLineItemField('item', 'location').setDisplayType('disabled');
	}
	catch(ex)
	{
		var errorStr = (ex.getCode != null) ? ex.getCode() + '<br>' + ex.getDetails() + '<br>' + ex.getStackTrace().join('<br>') : ex.toString();
		nlapiLogExecution('Debug', 'WayBillGenerationfulfill', 'WayBillGenerationfulfill : ' + '<br>' + errorStr);
	}
}
function WayBillTrackingFun()
{
	
		var loadRecord = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());			
		var Way_bill_no1=loadRecord.getFieldValue('custbody_way_bill_number');	
		
		var Shipping_method=loadRecord.getFieldValue('shipmethod');		
		var LicKeyVar="";
		var LoginIDVar="";
		var Ship_Carrirr=loadRecord.getFieldValue('custbody_ns_order_ship_carrier');
		var Ship_Carrirr_fields = ['custrecord_ns_ship_login_id', 'custrecord_ns_ship_licence_key','custrecord_ns_ship_tracking_api'];
		
		if(nullCheck(Ship_Carrirr))
		{
			var columnsfields = nlapiLookupField('customrecord_ns_ship_config', Ship_Carrirr, Ship_Carrirr_fields);
			
			 LicKeyVar=columnsfields.custrecord_ns_ship_tracking_api;
			 LoginIDVar = columnsfields.custrecord_ns_ship_login_id;
			
			nlapiLogExecution('Debug', 'LicKeyVar', LicKeyVar);
			nlapiLogExecution('Debug', 'LoginIDVar', LoginIDVar);
			
		}
	
		//var Way_bill_no1="69522149292";
		var Handeler="tnt";
		var action="custawbquery";
		var LoginID=LoginIDVar;
		var LicKey=LicKeyVar;
		var Version="1.3";
		var Format="html";
		var Scan="1";
	
		nlapiLogExecution('DEBUG', 'Way_bill_no', Way_bill_no1);
		nlapiLogExecution('DEBUG', 'Shipping_method', Shipping_method);
	
		var TrackURL="";
		if(Shipping_method==13)
		{
			 TrackURL="https://api.bluedart.com/servlet/RoutingServlet?handler="+Handeler+"&action="+action+"&loginid="+LoginID+"&lickey="+LicKey+"&verno="+Version+"&awb=awb&format="+Format+"&numbers="+Way_bill_no1+"&scan="+Scan+"";
			 nlapiLogExecution('Debug', 'TrackURL', TrackURL);
		}
		else
		{
			 TrackURL=" https://www.delhivery.com/track/package/"+Way_bill_no1+"";
			 nlapiLogExecution('Debug', 'TrackURL', TrackURL);
		}	
		//nlapiLogExecution('DEBUG', 'TrackURL', TrackURL);
	
	
	// var createPDFURL = nlapiResolveURL('SUITELET','customscript_waybill_tracking_suitelet','customdeploy_waybill_tracking_suitelet', false);	                                               
	// createPDFURL += '&recordId=' + nlapiGetRecordId();
	// createPDFURL += '&recordType=' + nlapiGetRecordType();
	// //createPDFURL += '&waybillno=69522149292';
	// createPDFURL +='&flag=UI';
	// nlapiLogExecution('Debug', 'createPDFURL', createPDFURL);
	newWindow = window.open(TrackURL);
	
		
}

function WayBillPrint()
{
	var loadRecord = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId()); 
	var Way_bill_file=loadRecord.getFieldValue('custbody_bluedart_waybill_invoice');
	nlapiLogExecution('Debug', 'Way_bill_file', Way_bill_file);	
	var fileurl=getfileurl(Way_bill_file);
	nlapiLogExecution('Debug', 'fileurl', fileurl);
	newWindow = window.open(fileurl);
}


function WayBillTrackingSuitelet(request, response)
{
	
	var flagValue =request.getParameter('flag');
	
	if(flagValue =="UI")
	{
	
		var recordId =request.getParameter('recordId');
		var recordType =request.getParameter('recordType');
		nlapiLogExecution('Debug', 'recordId', recordId);
		nlapiLogExecution('Debug', 'recordType', recordType);

		var loadRecord = nlapiLoadRecord(recordType,recordId);	
		
		if(nullCheck(loadRecord))
		{
			var Way_bill_no1=loadRecord.getFieldValue('custbody_way_bill_number');
		
			var LicKeyVar="";
			var LoginIDVar="";
			var Ship_Carrirr=loadRecord.getFieldValue('custbody_ns_order_ship_carrier');
			var Ship_Carrirr_fields = ['custrecord_ns_ship_login_id', 'custrecord_ns_ship_licence_key','custrecord_ns_ship_tracking_api'];
			
			if(nullCheck(Ship_Carrirr))
			{
				var columnsfields = nlapiLookupField('customrecord_ns_ship_config', Ship_Carrirr, Ship_Carrirr_fields);
				
				 LicKeyVar=columnsfields.custrecord_ns_ship_tracking_api;
				 LoginIDVar = columnsfields.custrecord_ns_ship_login_id;
				
				nlapiLogExecution('Debug', 'LicKeyVar', LicKeyVar);
				nlapiLogExecution('Debug', 'LoginIDVar', LoginIDVar);
				
			}
	
			//var Way_bill_no1="69522149292";
			var Handeler="tnt";
			var action="custawbquery";
			var LoginID=LoginIDVar;
			var LicKey=LicKeyVar;
			var Version="1.3";
			var Format="html";
			var Scan="1";
	
			nlapiLogExecution('DEBUG', 'Way_bill_no', Way_bill_no1);
			
			var TrackURL="https://api.bluedart.com/servlet/RoutingServlet?handler="+Handeler+"&action="+action+"&loginid="+LoginID+"&lickey="+LicKey+"&verno="+Version+"&awb=awb&format="+Format+"&numbers="+Way_bill_no1+"&scan="+Scan+"";
			nlapiLogExecution('Debug', 'TrackURL', TrackURL);
			var response1 = nlapiRequestURL(TrackURL, null, null); 
			
			nlapiLogExecution('Debug', 'response.getCode()', response1.getCode());
			nlapiLogExecution('Debug', 'response1', response1);
			
			var string = response1.getBody().toString();
			nlapiLogExecution('DEBUG', 'string', string);
			
			response.write(string); 
		}
	}
	else if(flagValue=="website")
	{
		var Way_bill_no1 =request.getParameter('waybillno');
		nlapiLogExecution('Debug', 'Way_bill_no1 From website', Way_bill_no1);
		var itemfulfillmentSearch = nlapiSearchRecord("itemfulfillment",null,
		[
		   ["type","anyof","ItemShip"], 
		   "AND", 
		   ["custbody_way_bill_number","is",Way_bill_no1], 
		   "AND", 
		   ["mainline","is","T"]
		], 
		[
		   new nlobjSearchColumn("trandate"), 
		   new nlobjSearchColumn("type"), 
		   new nlobjSearchColumn("custbody_ns_order_ship_carrier"), 
		   new nlobjSearchColumn("custbody_way_bill_number")
		]
		);
		
		var ship_carrier="";
		if(nullCheck(itemfulfillmentSearch))
		{
			     ship_carrier=itemfulfillmentSearch[0].getValue('custbody_ns_order_ship_carrier');
			
		}
		
		var Ship_Carrirr_fields = ['custrecord_ns_ship_login_id', 'custrecord_ns_ship_licence_key','custrecord_ns_ship_tracking_api'];
		
		if(nullCheck(ship_carrier))
		{
			var columnsfields = nlapiLookupField('customrecord_ns_ship_config', ship_carrier, Ship_Carrirr_fields);
			
			 LicKeyVar=columnsfields.custrecord_ns_ship_tracking_api;
			 LoginIDVar = columnsfields.custrecord_ns_ship_login_id;
			
			nlapiLogExecution('Debug', 'LicKeyVar From website', LicKeyVar);
			nlapiLogExecution('Debug', 'LoginIDVar From website', LoginIDVar);
			
		}
		
		
		var Handeler="tnt";
		var action="custawbquery";
		var LoginID=LoginIDVar;
		var LicKey=LicKeyVar;
		var Version="1.3";
		var Format="html";
		var Scan="1";
	
		nlapiLogExecution('DEBUG', 'Way_bill_no From website', Way_bill_no1);
		
		var TrackURL="https://api.bluedart.com/servlet/RoutingServlet?handler="+Handeler+"&action="+action+"&loginid="+LoginID+"&lickey="+LicKey+"&verno="+Version+"&awb=awb&format="+Format+"&numbers="+Way_bill_no1+"&scan="+Scan+"";
		nlapiLogExecution('Debug', 'TrackURL From website', TrackURL);
		var response1 = nlapiRequestURL(TrackURL, null, null); 
		
		nlapiLogExecution('Debug', 'response.getCode()', response1.getCode());
		nlapiLogExecution('Debug', 'response1 From website', response1);
		
		var string = response1.getBody().toString();
		nlapiLogExecution('DEBUG', 'string From website', string);
		
		response.write(string); 
		
	}
}

function Before_Submit_WayBillGenerationfulfill(type)
{
	        var get_packaging_box_weight=0;
		    var packaging_box=nlapiGetFieldValue('custbody_packaging_box_type');
			//var invoice_amount=nlapiGetFieldValue('custbody_declared_value');	//CR-CR-30.12.20 - Shipment Value - Ref SAP Invoice Field - Chnaged to Multiselect, Commented this line and added below code
			var invoice_amount= 0;//nlapiGetFieldValue('custbody_declared_value');
			var Sales_id=nlapiGetFieldValue('createdfrom');			
			var sales_total=nlapiLookupField('salesorder', Sales_id, 'total');
			
			//CR-CR-30.12.20 - Shipment Value - Ref SAP Invoice Field - Chnaged to Multiselect, Commented this line and added below code
           /* if(nullCheck(invoice_amount))
			{
				invoice_amount=invoice_amount;
			}
			else
			{
				invoice_amount=sales_total;
			}	*/
			//CR-CR-30.12.20 - Shipment Value - Ref SAP Invoice Field - Chnaged to Multiselect, Commented this line and added below code
		
		//Begin: CR-30.12.20 - Shipment Value - Ref SAP Invoice Field - Chnaged to Multiselect
			var Sap_Inv_No =  nlapiGetFieldValue("custbody_ref_sap_invoice_no");
  nlapiLogExecution("DEBUG","Sap_Inv_No",Sap_Inv_No);
			if(nullCheck(Sap_Inv_No))
			{
				Sap_Inv_No = Sap_Inv_No.replace(/\u0005/g, ',');
				
				var Sap_Inv_Array = Sap_Inv_No.split(',');
				
				invoice_amount = getInvoiceAmountValues(Sap_Inv_Array);			//nlapiLogExecution("DEBUG","invoice_amount",invoice_amount);
				
				if(invoice_amount == 0)
				{
					//CR 10.12.20: As per production, if invoices are not attached then set Sales Order amount
					var Sales_id = nlapiGetFieldValue('createdfrom');		
		
					if(nullCheck(Sales_id))
					{
						sales_total=nlapiLookupField('salesorder', Sales_id, 'total');
						invoice_amount=sales_total;
					}
				}
				//nlapiSetFieldValue('custbody_declared_value',invoice_amount); //setting field last
			}
			else 
			{
				//CR 10.12.20: As per production, if invoices are not attached then set Sales Order amount
				var Sales_id = nlapiGetFieldValue('createdfrom');		
		
				if(nullCheck(Sales_id))
				{
					sales_total=nlapiLookupField('salesorder', Sales_id, 'total');
					invoice_amount=sales_total;
				}
				
				//nlapiSetFieldValue('custbody_declared_value',invoice_amount); //setting field last
			}
		//End:CR-30.12.20 - Shipment Value - Ref SAP Invoice Field - Chnaged to Multiselect
			
			if(nullCheck(packaging_box))
			{	
				get_packaging_box_weight = nlapiLookupField('customrecord_ns_shipping_package_type', packaging_box, 'custrecord_shipper_wt');
			}
			var ItemCount = nlapiGetLineItemCount('item');
			//nlapiLogExecution('DEBUG','ItemCount',ItemCount);
			var Eline;   
			var Item="";
			var Price=" ";
			var Name="";
			var unit_price="";
			var unit_price_total="";
			var taxcode;
			var item_string="";
			var DeclaredValue=0;
			var PieceCount="1";
			var item_quantity=0; 
			var is_item_fulfil=""
			var line_item_weight=0;
			var ActualWeight=0;
            var ActualWeight_total=0;
            var ActualWeight_total_final=0;
			for(Eline=1;Eline<=ItemCount;Eline++)
			{
				is_item_fulfil=nlapiGetLineItemValue('item', 'itemreceive', Eline);
				//nlapiLogExecution('DEBUG','is_item_fulfil',is_item_fulfil);
				if(is_item_fulfil=="T")
				{
					Item = nlapiGetLineItemValue('item', 'itemname', Eline);
					Price = nlapiGetLineItemValue('item', 'itemfxamount', Eline);
					Name = nlapiGetLineItemValue('item', 'itemdescription', Eline);
					item_quantity = nlapiGetLineItemValue('item', 'quantity', Eline);
					nlapiLogExecution('DEBUG','item_quantity',item_quantity);
					
					unit_price = nlapiGetLineItemValue('item', 'custcol_final_unit_price', Eline);
					nlapiLogExecution('DEBUG','unit_price',unit_price);
					
					unit_price_total=(parseFloat(item_quantity)*parseFloat(unit_price)).toFixed(2);
					
					line_item_weight = nlapiGetLineItemValue('item', 'custcol_line_item_weight', Eline);
					//nlapiLogExecution('DEBUG','line_item_weight',line_item_weight);

					
					DeclaredValue=parseFloat(parseFloat(DeclaredValue)+parseFloat(unit_price_total)).toFixed(2);
					//item_quantity_total=parseFloat(parseFloat(item_quantity_total)+parseFloat(item_quantity)).toFixed(0);
					ActualWeight=(parseFloat(parseFloat(item_quantity)*parseFloat(line_item_weight))/1000).toFixed(3);
                    //nlapiLogExecution('DEBUG','ActualWeight',ActualWeight); 
                  	ActualWeight_total=parseFloat(parseFloat(ActualWeight_total)+parseFloat(ActualWeight)).toFixed(3);
				}
			}
		nlapiLogExecution('DEBUG','DeclaredValue',DeclaredValue); 
		nlapiLogExecution('DEBUG','get_packaging_box_weight',get_packaging_box_weight); 
		ActualWeight_total_final=parseFloat(get_packaging_box_weight)+parseFloat(ActualWeight_total);	
		nlapiLogExecution('DEBUG','ActualWeight',ActualWeight_total); 
		nlapiSetFieldValue('custbody_shipment_piece_count',PieceCount);
		nlapiSetFieldValue('custbody_actual_we',ActualWeight_total_final);
		nlapiSetFieldValue('custbody_declared_value',invoice_amount);
}

function getfileurl(fileid)
{
	var file_url="";
	var fileSearch = nlapiSearchRecord("file",null,
	[
	   ["internalid","anyof",fileid]
	], 
	[
	   new nlobjSearchColumn("name").setSort(false), 
	   new nlobjSearchColumn("url"), 
	]
	);
	if(nullCheck(fileSearch))
	{
		file_url=fileSearch[0].getValue('url');
	}
	return file_url;
}

function getInvoiceAmountValues(Sap_Inv_Array)
{
	FinalInvAmount = 0;
	var customrecord_sap_refinvoice_recordSearch = nlapiCreateSearch("customrecord_sap_refinvoice_record",
	[
	   ["internalid","anyof",Sap_Inv_Array]
	], 
	[
	   new nlobjSearchColumn("internalid"), 
	   new nlobjSearchColumn("custrecord_invoice_amt")
	]
	);
	
	var resultSet = customrecord_sap_refinvoice_recordSearch.runSearch();
	
	var InvArray = [];
	var searchid = 0;
	do 
	{
		var resultslice = resultSet.getResults( searchid, searchid+1000 );
		for (var rs in resultslice) 
		{
			InvArray.push( resultslice[rs] );
			searchid++;
		}
	} while (nullCheck(resultslice) && resultslice.length >= 1000);
	
	for(var i=0; InvArray!=null && i<InvArray.length; i++)
	{
		var IntId=InvArray[i].getValue('internalid');
		var InvAmount=InvArray[i].getValue('custrecord_invoice_amt');
		
		if(nullCheck(InvAmount))
		{
			FinalInvAmount = parseFloat(FinalInvAmount) + parseFloat(InvAmount);
			//nlapiLogExecution("DEBUG","FinalInvAmount",FinalInvAmount);
		}
	}
	
	if(!nullCheck(FinalInvAmount))
	{
		FinalInvAmount = 0;
	}
	//nlapiLogExecution("DEBUG","FinalInvAmount Last",FinalInvAmount);
	return FinalInvAmount;
	
}



