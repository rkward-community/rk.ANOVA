// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
  // add requirements etc. here
  var noLoadMsg = getValue("noLoadMsg");
  if(noLoadMsg) {
    echo("suppressMessages(require(" + "ez" + "))\n");
  } else {
    echo("require(" + "ez" + ")\n");
  }
}

function calculate(){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var design = getString("design");
  var dependend = getString("dependend");
  var caseID = getString("caseID");
  var within = getString("within");
  var between = getString("between");
  var observed = getString("observed");
  var sumOfSqType = getString("sumOfSqType");
  var hetScedCorrection = getString("hetScedCorrection");
  var saveResults = getString("saveResults");
  var showExtraInfo = getBoolean("showExtraInfo.state");
  var aov = getBoolean("aov.state");
  var noLoadMsg = getBoolean("noLoadMsg.state");

  // the R code to be evaluated
  var dependendShortname = getValue("dependend.shortname").split("\n").join(", ");
  var caseIDShortname = getValue("caseID.shortname").split("\n").join(", ");
  var withinShortname = getValue("within.shortname").split("\n").join(", ");
  var betweenShortname = getValue("between.shortname").split("\n").join(", ");
  var observedShortname = getValue("observed.shortname").split("\n").join(", ");
  if(sumOfSqType == 3) {
    comment("set contrasts for accurate type 3 ANOVA", "  ");  
    echo("\toptions(contrasts=c(\"contr.sum\",\"contr.poly\"))\n");  
  } else {}
  if(caseID == "" && design == "between") {
    comment("ezANOVA demands a subject identifier variable", "  ");  
    echo("\t" + dataSelected + " <- cbind(" + dataSelected + ", ez.subject.ID.dummy=factor(1:nrow(" + dataSelected + ")))\n");  
  } else {}
  echo("\tanova.results <- ezANOVA(");
  if(dataSelected) {
    echo("\n\t\tdata=" + dataSelected);  
  } else {}
  if(dependend) {
    echo(",\n\t\tdv=.(" + dependendShortname + ")");  
  } else {}
  if(caseID) {
    echo(",\n\t\twid=.(" + caseIDShortname + ")");  
  } else if(design == "between") {
    echo(",\n\t\twid=.(ez.subject.ID.dummy)");  
  } else {}
  if(within != "" && design != "between") {
    echo(",\n\t\twithin=.(" + withinShortname + ")");  
  } else {}
  if(between != "" && design != "within") {
    echo(",\n\t\tbetween=.(" + betweenShortname + ")");  
  } else {}
  if(observed) {
    echo(",\n\t\tobserved=.(" + observedShortname + ")");  
  } else {}
  if(sumOfSqType != 2) {
    echo(",\n\t\ttype=" + sumOfSqType);  
  } else {}
  if(hetScedCorrection != "false") {
    echo(",\n\t\twhite.adjust=\"" + hetScedCorrection + "\"");  
  } else {}
  if(showExtraInfo) {
    echo(",\n    detailed=TRUE");
  } else {}
  if(aov) {
    echo(",\n    return_aov=TRUE");
  } else {}
  echo(")\n\n");
}

function printout(){
  // printout the results
  new Header(i18n("ANOVA results")).print();

  echo("\trk.print(anova.results[[\"ANOVA\"]])\n");
  echo("\tif(\"Mauchly's Test for Sphericity\" %in% names(anova.results)){\n\t\t");
  new Header(i18n("Mauchly's Test for Sphericity"), 3).print();
  echo("\t\trk.print(anova.results[[\"Mauchly's Test for Sphericity\"]])\n\t} else {}\n");
  echo("\tif(\"Sphericity Corrections\" %in% names(anova.results)){\n\t\t");
  new Header(i18n("Sphericity Corrections"), 3).print();
  echo("\t\trk.print(anova.results[[\"Sphericity Corrections\"]])\n\t} else {}\n");
  echo("\tif(\"Levene's Test for Homgeneity\" %in% names(anova.results)){\n\t\t");
  new Header(i18n("Levene's Test for Homgeneity"), 3).print();
  echo("\t\trk.print(anova.results[[\"Levene's Test for Homgeneity\"]])\n\t} else {}\n");
  //// save result object
  // read in saveobject variables
  var saveResults = getValue("saveResults");
  var saveResultsActive = getValue("saveResults.active");
  var saveResultsParent = getValue("saveResults.parent");
  // assign object to chosen environment
  if(saveResultsActive) {
    echo(".GlobalEnv$" + saveResults + " <- anova.results\n");
  } else {}

}

