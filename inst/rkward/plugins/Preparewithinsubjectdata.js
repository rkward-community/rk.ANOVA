// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
  // add requirements etc. here

}

function calculate(){
  // read in variables from dialog
  var pdDataSelected = getString("pdDataSelected");
  var pdResponse = getString("pdResponse");
  var pdNameDependend = getString("pdNameDependend");
  var pdNameCondition = getString("pdNameCondition");
  var pdNameCaseID = getString("pdNameCaseID");
  var pdCaseID = getString("pdCaseID");
  var pdBetween = getString("pdBetween");
  var pdSaveResults = getString("pdSaveResults");
  var pdGenCaseID = getBoolean("pdGenCaseID.state");

  // the R code to be evaluated
  var pdResponseShortname = getValue("pdResponse.shortname").split("\n").join("\", \"");
  var pdResponse = getValue("pdResponse").split("\n").join(",\n\t\t\t");
  var pdCaseIDShortname = getValue("pdCaseID.shortname");
  var pdBetweenShortname = getValue("pdBetween.shortname");
  var lngPdBetween = getValue("pdBetween").split("\n").join(",\n\t\t\t");
  if(pdDataSelected) {
    echo("\tnum.cases <- nrow(" + pdDataSelected + ")\n");  
  } else {
    echo("\tnum.cases <- unique(sapply(list(\n\t\t\t" + pdResponse);  
    if(!pdGenCaseID && pdCaseID) {
      echo(",\n\t\t\t" + pdCaseID);  
    } else {}  
    if(pdBetween) {
      echo(",\n\t\t\t" + lngPdBetween);  
    } else {}  
    echo("),\n\t\tlength))\n\tif(length(num.cases) > 1) {" + "\n\t\tstop(simpleError(" + i18n("Can't determine number of cases, variables don't have equal length!") + "))" + "\n\t}\n");  
  }
  if(pdResponse) {
    echo("\tanova.conditions <- c(\"" + pdResponseShortname + "\")\n\tnum.conditions <- length(anova.conditions)\n\n");  
  } else {}
  if(pdBetween) {
    var betweenVarsNames = pdBetweenShortname.split("\n");  
    var betweenVars = pdBetween.split("\n");  
  } else {
    var betweenVars = "";  
  }
  echo("\tanova.data <- data.frame(");
  if(pdResponse) {
    echo("\n\t\t" + pdNameDependend + "=c(\n\t\t\t" + pdResponse + ")" + ",\n\t\t" + pdNameCondition + "=factor(rep(anova.conditions, each=num.cases))");  
  } else {}
  if(pdGenCaseID && pdNameCaseID) {
    echo(",\n\t\t" + pdNameCaseID + "=factor(rep(1:num.cases, times=num.conditions))");  
  } else {}
  if(!pdGenCaseID && pdCaseID) {
    echo(",\n\t\t" + pdCaseIDShortname + "=factor(rep(" + pdCaseID + ", times=num.conditions))");  
  } else {}
  if(pdBetween) {
    for (var i=0, len=betweenVarsNames.length; i<len; ++i ){
      echo(",\n\t\t" + betweenVarsNames[i] + "=factor(rep(" + betweenVars[i] + ", times=num.conditions))");
    }  
  } else {}
  echo(",\n\t\tstringsAsFactors=FALSE)\n\n");
}

function printout(){
  // printout the results
  new Header(i18n("Prepare within subject data")).print();

  echo("\trk.print(summary(anova.data))\n");
  //// save result object
  // read in saveobject variables
  var pdSaveResults = getValue("pdSaveResults");
  var pdSaveResultsActive = getValue("pdSaveResults.active");
  var pdSaveResultsParent = getValue("pdSaveResults.parent");
  // assign object to chosen environment
  if(pdSaveResultsActive) {
    echo(".GlobalEnv$" + pdSaveResults + " <- anova.data\n");
  } else {}

}

