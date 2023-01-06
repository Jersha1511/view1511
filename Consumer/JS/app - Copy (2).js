//The URIs of the REST endpoint
IUPS = "https://prod-00.uksouth.logic.azure.com:443/workflows/42aaedb96318440e9f095b911ff1f8a6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RhqToa54r7hs381aOY7BIdB79857t9MpL3_SrA3yMTw";
RAI = "https://prod-01.uksouth.logic.azure.com:443/workflows/8ffb14d0954b4207aa1d35ab422f97dd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Wg8m58FS1z5qpf08qzgGpWDrEOCRvcmtNE0G3sE2pMY";

BLOB_ACCOUNT = "https://movies1511.blob.core.windows.net/";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('Title', $('#Title').val());
 submitData.append('Publisher', $('#Publisher').val());
 submitData.append('Producer', $('#Producer').val());
 submitData.append('Genre', $('#Genre').val());
 submitData.append('AgeRating', $('#AgeRating').val());
 submitData.append('File', $("#UpFile")[0].files[0]);
 
 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){
 
 }
 });
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

 //Replace the current HTML in that div with a loading message
 $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAI, function( data ) {
 //Create an array to hold all the retrieved assets
 var items = [];
 
 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 //items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />")
 items.push("<video controls width='320'> <source src='"+BLOB_ACCOUNT + val["filepath"] +"' height='40'/> </video> <br />")

 items.push( "File : " + val["Title"] + "<br />");
 items.push( "Publisher is " + val["Publisher"] + "<br />"+ "Producer is "+val["Producer"]+"<br />");
 items.push( "Genre is " + val["Genre"] + "<br />"+ "Age Rating is: "+val["AgeRating"]+"<br />");
 items.push( "<hr />");
 });
 //Clear the assetlist div 
 $('#ImageList').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
 html: items.join( "" )
 }).appendTo( "#ImageList" );
 });
}

