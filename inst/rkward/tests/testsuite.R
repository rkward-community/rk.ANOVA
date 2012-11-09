## definition of the test suite
	suite <- new("RKTestSuite",
		id="rk.ANOVA",
		## needed packages
		libraries = c("rk.ANOVA"),
		## initCalls are run *before* any tests. Use this to set up the environment
		initCalls = list(
			function(){
				## load needed packages
				require("ez")

				## prepare needed data objects
				sample.data.frame <- data.frame(
					subjects=1:30, cond1=31:60, cond2=131:160
				)
				assign("sample.data.frame", sample.data.frame, envir=globalenv())
			},
			function(){
				## if some tests depend on results of earlier tests,
				## you can store those in a list in .GlobalEnv
				earlier.results <<- list()
				rk.sync.global ()
			}
		),
		## the tests
		tests = list(
				## define the actual tests here
				new("RKTest", id="prepare.data", call=function(){
					rk.call.plugin ("rkward::cmp_ANOVAPreparewithinsbjctdt", chc_Atmtccss.state="", inp_Nmfrdpnd.text="response", inp_Nmfrxprm.text="condition", svb_Svrsltst.active="1", svb_Svrsltst.objectname="anova.data", svb_Svrsltst.parent=".GlobalEnv", vrsl_Btwnsbjc.available="", vrsl_Cssbjctd.available="sample.data.frame[[\"subjects\"]]", vrsl_Dpndntrs.available="sample.data.frame[[\"cond1\"]]\nsample.data.frame[[\"cond2\"]]", vrsl_Slctllvr.available="sample.data.frame", submit.mode="submit")
				## to store these results:
					earlier.results$anova.data <<- anova.data
					rk.sync.global ()
				}),
				new("RKTest", id="ANOVA", call=function(){
					anova.data <<- earlier.results$anova.data
					rk.sync.global ()
					rk.call.plugin ("rkward::cmp_ANOVAANOVA", chc_Rtrnvbjc.state="true", chc_Shwsmsfs.state="true", chc_Spprsspc.state="true", drp_Htrscdst.string="false", drp_Smsfsqrs.string="2", rad_Design.string="within", svb_Svrsltst.active="0", svb_Svrsltst.objectname="anova.results", svb_Svrsltst.parent=".GlobalEnv", vrsl_Cssbjctd.available="anova.data[[\"subjects\"]]", vrsl_Dpndntvr.available="anova.data[[\"response\"]]", vrsl_Dtmstbdt.available="anova.data", vrsl_Obsrvdvr.available="", vrsl_Wthnsbjc.available="anova.data[[\"condition\"]]", submit.mode="submit")
				})
		),
		## postCalls are like initCalls, but run after all tests to clean up.
		postCalls = list(
			function(){
				## e.g. remove created objects
				rm(list=c("earlier.results","sample.data.frame"), envir=globalenv())
			}
		)
	)