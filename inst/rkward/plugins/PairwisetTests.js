// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
  // add requirements etc. here

}

function calculate(){
  // read in variables from dialog
  var ptDataFormat = getString("ptDataFormat");
  var ptResponse = getString("ptResponse");
  var ptGroup = getString("ptGroup");
  var ptSepResponses = getString("ptSepResponses");
  var ptAdjustP = getString("ptAdjustP");
  var ptHypothesis = getString("ptHypothesis");
  var ptPooledSD = getBoolean("ptPooledSD.state");
  var ptPaired = getBoolean("ptPaired.state");

  // the R code to be evaluated
  if(ptDataFormat == "one") {
    echo("\tpair.t.results <- pairwise.t.test(\n\t\t");  
    if(ptResponse) {
      echo("x=" + ptResponse);  
    } else {}  
    if(ptGroup) {
      echo(",\n\t\tg=" + ptGroup);  
    } else {}  
  } else {
    ptSepResponses = getValue("ptSepResponses").split("\n").join(", ");  
    comment("simple helper function to get the names of the objects", "  ");  
    echo("\tgrouping.vector <- function(...){\n\tunlist(lapply(match.call()[-1], function(x){rep(deparse(x), length(eval(x)))}))\n}\n");  
    if(ptSepResponses) {
      comment("create data and grouping vectors", "  ");  
      echo("\tdata <- c(" + ptSepResponses + ")\n\tgroup <- grouping.vector(" + ptSepResponses + ")\n\n");  
    } else {}  
    comment("the actual pairwise t-tests, using the prepared data", "  ");  
    echo("\tpair.t.results <- pairwise.t.test(\n\t\t");  
    if(ptSepResponses) {
      echo("x=data,\n\t\tg=group");  
    } else {}  
  }
  if(ptAdjustP) {
    echo(",\n\t\tp.adjust.method=\"" + ptAdjustP + "\"");  
  } else {}
  if(ptPooledSD) {
    echo(",\n    pool.sd=TRUE");
  } else {}
  if(ptPaired) {
    echo(",\n    paired=TRUE");
  } else {}
  if(ptHypothesis != "two.sided") {
    echo(",\n\t\talternative=\"" + ptHypothesis + "\"");  
  } else {}
  echo(")\n\n");
}

function printout(){
  // printout the results
  new Header(i18n("Pairwise t-Tests")).print();

  echo("rk.print(pair.t.results)\n");

}

