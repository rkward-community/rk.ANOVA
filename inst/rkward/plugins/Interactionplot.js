// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!
// 
// look for a file called: $SRC/inst/rkward/rkwarddev_ANOVA_plugin_script.R

function preview(){
  preprocess(true);
  calculate(true);
  printout(true);
}

function preprocess(is_preview){
  // add requirements etc. here
  if(is_preview) {
    echo("if(!base::require(sciplot)){stop(" + i18n("Preview not available, because package sciplot is not installed or cannot be loaded.") + ")}\n");
  } else {
    echo("require(sciplot)\n");
  }
}

function calculate(is_preview){
}

function printout(is_preview){
  // read in variables from dialog
  var ipFactor = getString("ipFactor");
  var ipResponse = getString("ipResponse");
  var ipGroups = getString("ipGroups");
  var ipPlotType = getString("ipPlotType");
  var ipPlotElements = getString("ipPlotElements");
  var ipPlotBars = getString("ipPlotBars");
  var ipClipping = getString("ipClipping");
  var ipLegendLabel = getString("ipLegendLabel");
  var ipUpperError = getBoolean("ipUpperError.state");
  var ipLowerError = getBoolean("ipLowerError.state");
  var ipLegendChecked = getBoolean("ipLegend.checked");
  var ipDrawSEChecked = getBoolean("ipDrawSE.checked");

  // printout the results
  if(!is_preview) {
    new Header(i18n("Interaction plot")).print();  
  } else {}  // in case there are generic plot options defined:
  var embRkwrdpltptnGCodePreprocess = getValue("emb_rkwrdpltptnG.code.preprocess");
  var embRkwrdpltptnGCodePrintout = getValue("emb_rkwrdpltptnG.code.printout");
  var embRkwrdpltptnGCodeCalculate = getValue("emb_rkwrdpltptnG.code.calculate");

  if(!is_preview) {
    echo("rk.graph.on()\n");  
  } else {}
  echo("  try({\n");

  // insert any option-setting code that should be run before the actual plotting commands:
  printIndentedUnlessEmpty("    ", embRkwrdpltptnGCodePreprocess, "\n", "");

  // the actual plot:
  var ipLegendChecked = getValue("ipLegend.checked");
  var ipDrawSEChecked = getValue("ipDrawSE.checked");
  if(ipPlotType == "line") {
    echo("\t\tlineplot.CI(");  
  } else {
    echo("\t\tbargraph.CI(");  
  }
  if(ipFactor) {
    echo("\n\t\t\tx.factor=" + ipFactor);  
  } else {}
  if(ipResponse) {
    echo(",\n\t\t\tresponse=" + ipResponse);  
  } else {}
  if(ipGroups) {
    echo(",\n\t\t\tgroup=" + ipGroups);  
  } else {}
  if(ipPlotType == "line") {
    if(ipPlotElements != "b") {
      echo(",\n\t\t\ttype=\"" + ipPlotElements + "\"");  
    } else {}  
    if(!ipLegendChecked && ipGroups != "") {
      echo(",\n\t\t\tlegend=FALSE");  
    } else {}  
    if(!ipDrawSEChecked) {
      echo(",\n\t\t\tci.fun=function(x)c(mean(x, na.rm=TRUE), mean(x, na.rm=TRUE))");  
    } else {}  
  } else {
    if(ipPlotBars == "split") {
      echo(",\n\t\t\tsplit=TRUE");  
    } else {}  
    if(ipLegendChecked && ipGroups != "") {
      echo(",\n\t\t\tlegend=TRUE");  
    } else {}  
    if(!ipDrawSEChecked) {
      echo(",\n\t\t\tuc=FALSE,\n\t\t\tlc=FALSE");  
    } else {}  
    if(ipDrawSEChecked && !ipUpperError) {
      echo(",\n\t\t\tuc=FALSE");  
    } else {}  
    if(ipDrawSEChecked && !ipLowerError) {
      echo(",\n\t\t\tlc=FALSE");  
    } else {}  
    if(ipClipping == "figure") {
      echo(",\n\t\t\txpd=TRUE");  
    } else if(ipClipping == "device") {
      echo(",\n\t\t\txpd=NA");  
    } else {}  
  }
  if(ipLegendChecked && ipGroups != "" && ipLegendLabel != "") {
    echo(",\n\t\t\tleg.lab=\"" + ipLegendLabel + "\"");  
  } else {}
  echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
  echo("\n\t\t)");

  // insert any option-setting code that should be run after the actual plot:
  printIndentedUnlessEmpty("    ", embRkwrdpltptnGCodeCalculate, "\n", "");

  echo("\n  })\n");
  if(!is_preview) {
    echo("rk.graph.off()\n");  
  } else {}

}

